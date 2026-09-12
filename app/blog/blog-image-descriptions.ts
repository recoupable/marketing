// Imported figures originally had empty alt text. These descriptions use the
// surrounding article instructions and captions. The chart, file-tree, and
// sandbox-code descriptions were refined after reviewing the loaded figures.
// Covers and the decorative information icon intentionally stay silent.
const imageDescriptions: Record<string, string> = {
  "2a2e0e15188b411cff8960e7d2785ca9ffb50bb1ad348fa10fea11266f27960b.png": "Active users trend across 2025: growth through October, a sharp drop in November, then a partial recovery in December.",
  "f06c6398d753ed5b5b68ebdca48a4e4ebda46642438d51fe5b53ff87a40c0c43.png": "Bash in an isolated environment for record-label tasks.",
  "f11dd7edf2f63e8935a8f77ff306f206e9f91e6e55b872afd5b9b82ff5e2c3af.png": "Example file-system tree showing applications, users, volumes, and nested folders and files.",
  "c2f70a8810c90c98852ec1fe00db9ad366a23827497efea43a951de2ff9c3a85.png": "The article’s comparison of a VPS and just-in-time sandboxes.",
  "3e4e83b215694b27b369f6a9dfa7b58b4d115667f62e59cf65325a4a6900dea3.png": "JavaScript configuration for a Vercel sandbox, including its source repository, CPU resources, timeout, and Node.js runtime.",
  "e661461336733bca760fcbf9ecc00547c19f0be3494f654e2a1f14daa34b2aaf.png": "Recoup sandboxes: a shared file system and Bash for label workflows.",
  "6d599c3c61a0640bcabeb2109401aae8edd64bd7d5e9a131403bfbabd3831e68.png": "Legacy Recoup: Create new artist.",
  "f29e5f630e52a6f0236df3b5a4335b8b0282fd914ddc38c0cb2d87e118ea06e9.png": "Workflows, sandboxes, and Bash in the Open Labels architecture.",
  "5b4bf4f9c0e8f910b9723288fb7c803032190731128d5d1883dbd6b8d93c5bf5.png": "Step 1: Open Claude Desktop, select Cowork, then choose Customize.",
  "a7a970355c920f154e70133bcda92daaaad33e1f70e45515f9a0b9695b022b21.png": "Step 2: Select the Plugins tab.",
  "b92e1342dc61078e67c4208825343b2d15c450cb59a52f20c8d9e5bb8490708d.png": "Step 3: Choose the Add plugin plus icon.",
  "a69b77a255ba60aa283fa7d6e3e65426373d9d94be8d523674585a0117d13dce.png": "Step 4: Hover over Create plugin, then choose Add marketplace.",
  "a0c2ab7f2a63a57c1b2bf98d186b39d423aff871e17d11f79bb79c88c41018ae.png": "Step 5: Add github.com/recoupable/marketplace and select Sync.",
  "269220126dfaea87012fe04002684405868aeb93269625b1799c73709731b6dc.png": "Step 6: Add the Recoup catalog deals, platform, and content plugins.",
  "54152536e99040f3e80e1b13a15ec595805a29027009466f7d626f8c76330c28.png": "Step 7: Restart Claude and begin with /recoup-catalog-deal.",
  "e548c59d26704097b7addb73dbffda893f316b2c9da71e1aa94e44198e2345ab.png": "Step 8: Choose the deal type and deal name.",
  "12dec894451fa5635cbcfb89e4d9bb9301f5086c7315573e0a7d7d304f60cfbf.png": "Step 9: Choose Files and select a data room.",
  "8bd682a0c366a602b51a83a4ba0b31cb6a67c7af946aac546ed8ace2926f12ec.png": "Step 10: Open the dashboard and check the emailed results.",
  "7082d55c9e32937936233e54b415853b8cb265f5ecd6abad23af5dc0251a2e66.png": "Recoup Web Chat.",
  "09932d871330402b0cb025514036eb3022229c8dc971dfc609ba6cebac1379de.png": "Claude Cowork with Recoup Plugins.",
  "2e934f22e7aba8746cb1513a2d44b788c181a0c9d671deceb0fd6960394df519.png": "Recoup Docs for an agent to read.",
  "fe0e1235dcd9d8c78997452787d5a331f58ee662b1062dd3d598f0c71f9aa340.png": "Music data and tools for an agent using the Recoup API.",
};

export function blogImageDescription(src: string): string {
  const prefix = "https://storage.googleapis.com/papyrus_images/";
  return src.startsWith(prefix) ? imageDescriptions[src.slice(prefix.length)] || "" : "";
}
