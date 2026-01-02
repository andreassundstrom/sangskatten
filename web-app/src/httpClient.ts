export const GetSheetMusicById = async (id: number, signal: AbortSignal) => {
  return fetch(`/api/v1/sheet-music/${id}`,{ signal })
}