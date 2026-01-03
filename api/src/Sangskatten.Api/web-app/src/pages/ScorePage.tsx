import { OpenSheetMusicDisplay, TransposeCalculator } from "opensheetmusicdisplay"
import { useRef, useState, useEffect } from "react"
import { Link, useParams } from "react-router"
import { GetSheetMusicById as GetSheetMusicByFilename } from "../httpClient"
import { Box, Button, Card, CardContent, MenuItem, TextField } from "@mui/material"

export const ScorePage = () => {
    return <Box>
        <Card>
          <CardContent>
            <ScoreRenderer />
          </CardContent>
        </Card>
    </Box>
}

const ScoreRenderer = ({} :{}) => {
  const { id } = useParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState<OpenSheetMusicDisplay|null>(null)
  const [errDisplay,setErrDisplay] = useState<string>()
  const [transpose, setTranspose] = useState<number>(0)

  useEffect(() => {
    if(!containerRef.current || id == undefined) {
      return;
    }

    const osmd = new OpenSheetMusicDisplay(containerRef.current, {});
    let abortController = new AbortController()
    
    GetSheetMusicByFilename(id, abortController.signal)
      .then(res => {
        if(res.status !== 200){
          throw new Error("Non success status code")
        }
        return res.text()
      })
      .then(xml => {
        osmd.load(xml)
        osmd.TransposeCalculator = new TransposeCalculator();
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
    },[id])

    const transposeScore = (transposeValue:number) => {
      if(score === null){
        throw new Error('Score is null')
      }

      score.Sheet.Transpose = transposeValue;
      score.updateGraphic();
      setTranspose(transposeValue)
      score.render()
    }

  return <>
      {errDisplay && <div><strong>ERROR: </strong>{errDisplay}</div>}
      <Button component={Link} to="/">Back</Button>
      <TextField select value={transpose} onChange={e => transposeScore(Number(e.target.value))}>
        {transposeRange.map(e => 
          <MenuItem value={e}>{e}</MenuItem>
        )}
      </TextField>
      <Box sx={{width:'100%'}}>
        <audio controls style={{width:'100%'}}>
          <source src={`/scores/audio/${id}.mp3`} type="audio/mpeg" />
        </audio>
      </Box>
      <div data-cy="score-div" ref={containerRef}>
      </div>
  </>
}
const transposeRange = [0,1,2,3,4,5,6,7,8,9,10,11]