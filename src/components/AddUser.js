import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL } from "../utils";

export default function AddUser() {
    const [name, setName] = React.useState("");
    const [progress, setProgress] = React.useState(false);
    async function addUser() {
        setProgress(true);
        if(name !== null && name !== "") {
            try{
                await axios.post(`${BASE_URL}/user`, {
                    name: name
                });  
            } catch(e) {
                console.log(e);
            }
              
        }
        setProgress(false);
    }

    return(
        <div style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100vw",
            marginTop: "20px",

        }}>
            <h3> Add User </h3>
            <div style={{ display: "flex", alignItems: "center" }}>
                <TextField required id="add-user-text" label="Enter Name" value={name} 
                onChange={(event) => setName(event.target.value)} />
                &nbsp; &nbsp;
                <Button variant="contained" onClick={addUser} disabled={progress}> Add User </Button>
            </div>
            {progress ? <CircularProgress/> : <></>}
        </div>
    )
}