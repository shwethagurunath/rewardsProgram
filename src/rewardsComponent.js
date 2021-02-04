import React, { useState } from 'react';
import CustomerRewards from "./customerRewards";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    rewards: {
        margin: 'auto',
        padding: 10
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const RewardsComponent = () => {
    const [customerName, setCustomerName] = useState("");
    const [rewardCustomerName, setRewardCustomerName] = useState("");
    const [purchaseDate, setPurchaseDate] = useState();
    const [purchaseAmount, setPurchaseAmount] = useState();
    const [customerDetails, setCustomerDetails] = useState(CustomerRewards)
    const [rewardPoints, setRewardPoints] = useState();
    const [showMessage, setShowMessage] = useState(false);
    const classes = useStyles();

    function handleSubmit(event) {
        event.preventDefault();
        let newPurchaseDetails = {
            name: customerName,
            date: purchaseDate,
            amount: Number(purchaseAmount)
        }
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false)
        }, 5000)
        let updateCustomerDetails = customerDetails;
        updateCustomerDetails.push(newPurchaseDetails);
        setCustomerDetails(updateCustomerDetails);
    }

    function customerNameChanged(evt) {
        evt.preventDefault();
        setCustomerName(evt.target.value)
    }

    function purchaseAmountChanged(evt) {
        evt.preventDefault();
        setPurchaseAmount(parseFloat(evt.target.value))
    }

    function purchaseDateChanged(evt) {
        evt.preventDefault();
        setPurchaseDate(evt.target.value)
    }

    function rewardCustomerNameChanged(evt) {
        evt.preventDefault();
        setRewardCustomerName(evt.target.value)
    }


    function getRewards() {
        let filteredList = customerDetails.filter(item => item.name === rewardCustomerName);
        let points = 0;
        filteredList.forEach(item => {
            console.log(item, new Date(item.date).getMonth(), new Date().getMonth())
            let monthDiff = 12 - new Date(item.date).getMonth() + new Date().getMonth();
            if (monthDiff > 12) {
                monthDiff = monthDiff - 12;
            }
            if ((monthDiff <=3)) {
                if (item.amount > 100) {
                    console.log((item.amount - 100) * 2 + (item.amount - (item.amount - 100) - 50))
                    points += (item.amount - 100) * 2 + (item.amount - (item.amount - 100) - 50);
                }
                if (item.amount < 100 && item.amount > 50) {
                    points += (item.amount - 50);
                }
                
            }
        })
        setRewardPoints(points);
    }


    return (
        <div>
            <div className={classes.root}>
                <h1>Calculate Rewards</h1>
                <div className={classes.rewards}>
                    <TextField onChange={rewardCustomerNameChanged} placeholder="Enter Customer Name" required id="standard-required" label="" />
                </div>
                <Button variant="contained" color="primary" onClick={getRewards}>Calculate Rewards</Button>
                {
                    rewardPoints ? <div className={classes.rewards}>
                        <span>Rewards:{rewardPoints}</span>
                    </div> : null
                }

            </div>

            <div className="addNewPurchase">
                <h1>Add New Purchase</h1>
                <form>
                    <div className={classes.rewards}>
                        <TextField onChange={customerNameChanged} placeholder="Enter Customer Name" required id="standard-required" label="" value={customerName} />
                    </div>
                    <div className={classes.rewards}>
                        <TextField
                            id="purchaseDate"
                            label="Purchase Date"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={purchaseDate}
                            onChange={purchaseDateChanged}
                        />
                    </div>
                    <div className={classes.rewards}>
                        <TextField type="number" onChange={purchaseAmountChanged} placeholder="Enter Purchase Amount" required id="standard-required" label="" value={purchaseAmount} />
                    </div>
                    <div className={classes.rewards}><Button variant="contained" color="primary" onClick={handleSubmit}>Add New Purchase</Button></div>
                    {
                        showMessage ? <Alert severity="success">New Purchase Added</Alert> : null
                    }
                </form>

            </div>
        </div>
    )
}

export default RewardsComponent;