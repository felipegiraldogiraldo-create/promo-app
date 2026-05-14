// localStorage-based DB — replaces Firebase
function lsGet(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch(e) { return null; }
}
function lsSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) {}
}

export const db = {
    collection: (name) => ({
          _name: name,
          getDocs: async () => {
                  const data = lsGet(name) || {};
                  return {
                            empty: Object.keys(data).length === 0,
                            docs: Object.entries(data).map(([id, d]) => ({ id, data: () => d }))
                  };
          },
          doc: (id) => ({
                  set: async (data) => {
                            const col = lsGet(name) || {};
                            col[id] = data;
                            lsSet(name, col);
                  },
                  delete: async () => {
                            const col = lsGet(name) || {};
                            delete col[id];
                            lsSet(name, col);
                  }
          })
    })
};

// Firebase-compatible helper exports
export function collection(dbObj, name) {
    return dbObj.collection(name);
}
export async function getDocs(colRef) {
    return colRef.getDocs();
}
export function doc(dbObj, colName, id) {
    return dbObj.collection(colName).doc(id);
}
export async function setDoc(docRef, data) {
    return docRef.set(data);
}
export async function deleteDoc(docRef) {
    return docRef.delete();
}
export async function addDoc(colRef, data) {
    const id = 'a_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    await colRef.doc(id).set({ ...data, id });
    return { id };
}
