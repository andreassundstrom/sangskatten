const GetSheetMusicById = async (id: number, signal: AbortSignal) => {
  return fetch(`/api/v1/sheet-music/${id}`,{ signal })
}

import { OpenSheetMusicDisplay } from "opensheetmusicdisplay"
import { useRef, useState, useEffect } from "react"
import { useParams } from "react-router"

export const SheetMusicPage = () => {
    return <>
        <h1>Sheet music</h1>
        {<ScoreRenderer />}
    </>
}

const ScoreRenderer = ({} :{}) => {
  const { id } = useParams()
  const idNumber = Number(id)
  const containerRef = useRef<HTMLDivElement>(null)
  const scoreRef = useRef<OpenSheetMusicDisplay>(null)
  const [errDisplay,setErrDisplay] = useState<string>()
  useEffect(() => {
    if(!containerRef.current || id == undefined) {
      return;
    }

    const osmd = new OpenSheetMusicDisplay(containerRef.current, {});
    scoreRef.current = osmd;
    let abortController = new AbortController()
    
    GetSheetMusicById(idNumber, abortController.signal).then(res => res.text())
      .then(xml => osmd.load(xml))
      .then(() => {
        osmd.render()})
      .catch(err => {
        if(abortController.signal.aborted){
          return;
        }
        setErrDisplay(`Failed to load xml: ${err}`)
      })

    return () => {
      abortController.abort();
    }
    },[])

  return <>
      {errDisplay && <div><em>ERROR: </em>{errDisplay}</div>}
      <div data-cy="score-div" ref={containerRef}>
      </div>
  </>
}