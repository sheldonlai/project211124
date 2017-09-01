import * as React from "react";
import Dialog from "material-ui/Dialog/Dialog";
import Slide from "material-ui/transitions/Slide";
import DialogContent from "material-ui/Dialog/DialogContent";
import DialogContentText from "material-ui/Dialog/DialogContentText";
import DialogActions from "material-ui/Dialog/DialogActions";
import Button from "material-ui/Button/Button";


interface props {
    open: boolean;
    onCancel: () => void;
    onLogout: () => void;
}


export class LogoutDialog extends React.Component<props>{
    render () {
        return (
            <Dialog open={this.props.open} transition={Slide}>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.onCancel()} color="primary">
                        No
                    </Button>
                    <Button onClick={() => {
                        this.props.onLogout();
                    }} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}