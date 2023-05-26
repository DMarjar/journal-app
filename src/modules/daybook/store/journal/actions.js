import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");
  const entries = [];

  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }

  commit("setEntries", entries);
};

export const updateEntry = async ({ commit }, entry) => {
  const { id, ...newEntry } = entry;
  await journalApi.put(`/entries/${entry.id}.json`, newEntry);

  commit("updateEntry", { ...entry });
};

export const createEntry = async (/*{ commit }*/) => {};
