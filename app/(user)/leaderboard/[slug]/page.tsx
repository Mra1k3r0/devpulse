import { createClient } from "../../../lib/supabase/server";
import LeaderboardTable from "../../../components/LeaderboardTable";

export default async function LeaderboardPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const supabase = await createClient();

  const { data: leaderboard } = await supabase
    .from("leaderboards")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!leaderboard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Leaderboard not found {slug}
      </div>
    );
  }

  const { data: members, error } = await supabase
    .from("leaderboard_members_view")
    .select("*")
    .eq("leaderboard_id", leaderboard.id);

  if (error) {
    console.error("Error fetching members:", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Error loading members.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{leaderboard.name}</h1>
        <p className="text-gray-400 mb-8">{leaderboard.description}</p>
        <LeaderboardTable members={members || []} />
      </div>
    </div>
  );
}
