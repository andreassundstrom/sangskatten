import { Instrument, OpenSheetMusicDisplay } from "opensheetmusicdisplay"
import { useRef, useState, useEffect } from "react"
import { useParams } from "react-router"
import { GetSheetMusicById } from "../httpClient"

export const SheetMusicPage = () => {
    return <>
        <a href="/">Back</a>
        {<ScoreRenderer />}
    </>
}

const ScoreRenderer = ({} :{}) => {
  const { id } = useParams()
  const idNumber = Number(id)
  const containerRef = useRef<HTMLDivElement>(null)
  const [_,setScore] = useState<OpenSheetMusicDisplay|null>(null)
  const [errDisplay,setErrDisplay] = useState<string>()

  useEffect(() => {
    if(!containerRef.current || id == undefined) {
      return;
    }

    const osmd = new OpenSheetMusicDisplay(containerRef.current, {});
    let abortController = new AbortController()
    
    GetSheetMusicById(idNumber, abortController.signal)
      .then(res => {
        if(res.status !== 200){
          throw new Error("Non success status code")
        }
        return res.text()
      })
      .then(xml => {
        osmd.load(xml)
        setScore(osmd)
      })
      .then(() => {
        osmd.render()})
      .catch((err:Error) => {
        if(abortController.signal.aborted){
          return;
        }
        setErrDisplay(`${err.message}`)
      })

    return () => {
      abortController.abort();
      setScore(null)
    }
    },[idNumber])

  return <>
      {errDisplay && <div><strong>ERROR: </strong>{errDisplay}</div>}
      <div data-cy="score-div" ref={containerRef}>
      </div>
  </>
}