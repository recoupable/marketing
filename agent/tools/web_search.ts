import { webSearch } from "eve/tools/web_search";

// Opt into public search without enabling the framework's shell or file tools.
export default webSearch({ provider: "parallel" });
