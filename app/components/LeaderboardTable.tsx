type Member = {
  role: string;
  email: string;
  total_seconds: number;
  languages: { name: string }[];
  operating_systems: { name: string }[];
  editors: { name: string }[];
};

function LeaderboardStats({ members }: { members: Member[] }) {
  // Total coding time in hours
  const totalHours = Math.round(
    members.reduce((acc, m) => acc + (m.total_seconds || 0), 0) / 3600,
  );

  // Count languages, editors, OS
  const languageCount: Record<string, number> = {};
  const editorCount: Record<string, number> = {};
  const osCount: Record<string, number> = {};

  members.forEach((m) => {
    m.languages.forEach((l) => {
      languageCount[l.name] = (languageCount[l.name] || 0) + 1;
    });
    m.editors.forEach((e) => {
      editorCount[e.name] = (editorCount[e.name] || 0) + 1;
    });
    m.operating_systems.forEach((os) => {
      osCount[os.name] = (osCount[os.name] || 0) + 1;
    });
  });

  const languageEntries = Object.entries(languageCount).filter(
    ([_, count]) => count > 0,
  );
  const topLanguage =
    languageEntries.sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  const leastLanguage =
    languageEntries.sort((a, b) => b[1] - a[1]).slice(-1)[0]?.[0] || "N/A";

  const topEditor =
    Object.entries(editorCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  const topOS =
    Object.entries(osCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 text-sm text-gray-400">
      <div className="bg-white/5 p-4 rounded-xl flex-1 text-center">
        <div className="font-bold text-white text-lg">{totalHours} hrs</div>
        <div>Total Coding Time</div>
      </div>
      <div className="bg-white/5 p-4 rounded-xl flex-1 text-center">
        <div className="font-bold text-white text-lg">{topLanguage}</div>
        <div>Top Programming</div>
      </div>
      <div className="bg-white/5 p-4 rounded-xl flex-1 text-center">
        <div className="font-bold text-white text-lg">{leastLanguage}</div>
        <div>Least Programming</div>
      </div>
      <div className="bg-white/5 p-4 rounded-xl flex-1 text-center">
        <div className="font-bold text-white text-lg">{topEditor}</div>
        <div>Top Editor</div>
      </div>
      <div className="bg-white/5 p-4 rounded-xl flex-1 text-center">
        <div className="font-bold text-white text-lg">{topOS}</div>
        <div>Top OS</div>
      </div>
    </div>
  );
}

export default function LeaderboardTable({ members }: { members: Member[] }) {
  const ranked = members
    .sort((a, b) => (b.total_seconds || 0) - (a.total_seconds || 0))
    .map((member, index) => ({
      rank: index + 1,
      email: member.email,
      hours: Math.round((member.total_seconds || 0) / 3600),
      role: member.role,
      languages: member.languages
        .slice(0, 3)
        .map((l) => l.name)
        .join(", "),
      os: member.operating_systems[0]?.name || "N/A",
      editor: member.editors[0]?.name || "N/A",
    }));

  return (
    <div>
      <LeaderboardStats members={members} />

      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Developer</th>
              <th className="p-4">Hours</th>
              <th className="p-4">Languages</th>
              <th className="p-4">OS</th>
              <th className="p-4">Editor</th>
            </tr>
          </thead>

          <tbody>
            {ranked.map((user) => (
              <tr
                key={user.email}
                className="border-t border-white/10 hover:bg-white/5"
              >
                <td className="p-4 font-bold">#{user.rank}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.hours} hrs</td>
                <td className="p-4">{user.languages}</td>
                <td className="p-4">{user.os}</td>
                <td className="p-4">{user.editor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
