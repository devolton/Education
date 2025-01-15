import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

export default function Loading(){
    return (<div className='d-flex justify-content-center align-items-center m-5'>
        <CircularProgress color='inherit'/>
    </div>)
}