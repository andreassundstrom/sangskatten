export const GetSheetMusicById = async (id: string, signal: AbortSignal) => {
  return fetch(`/scores/sheet/${id}.musicxml`,{ signal })
}