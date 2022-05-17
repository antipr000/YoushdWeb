import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BASE_URL } from "../utils";

export default function AddTransaction({ users, transactions }) {
    const [amount, setAmount] = React.useState(0);
    const [referralUrl, setReferralUrl] = React.useState(null);
    const [userId, setUserId] = React.useState(null);
    const [progress, setProgress] = React.useState(false);

    async function addTransaction() {
        setProgress(true);
        
        if(userId === null || amount === 0) {
            window.alert("Enter correct value of user id and amount");
        } else {
            try{
                await axios.post(`${BASE_URL}/transaction`, {
                    amount: amount,
                    referral_url: referralUrl,
                    user_id: userId
                })
            }catch(e) {
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
            <h3> Add Transaction </h3>
            <div style={{ display: "flex", alignItems: "center" }}>
                <TextField required id="add-amount" label="Enter Amount" value={amount} type={"number"} 
                onChange={(event) => setAmount(parseInt(event.target.value))} />
                &nbsp; &nbsp;
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="user-id-select">User ID</InputLabel>
                    <Select
                    labelId="user-id-select"
                    id="user-id"
                    value={userId}
                    onChange={(event) => setUserId(event.target.value)}
                    label="User ID"
                    >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {users.map(user => <MenuItem value={user.id}> {user.id} </MenuItem>)}
                    </Select>
                </FormControl>

                &nbsp; &nbsp;
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="referral-id-select">Referral</InputLabel>
                    <Select
                    labelId="referral-id-select"
                    id="referral-id"
                    value={referralUrl}
                    onChange={(event) => setReferralUrl(event.target.value)}
                    label="Referral"
                    >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {transactions.map(transaction => <MenuItem value={transaction.referralUrl}> {transaction.referralUrl} </MenuItem>)}
                    </Select>
                </FormControl>
                &nbsp; &nbsp;
                <Button variant="contained" onClick={addTransaction} disabled={progress}> Add Transaction </Button>
            </div>
            {progress ? <CircularProgress/> : <></>}
        </div>
    )
}