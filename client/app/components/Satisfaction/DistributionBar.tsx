import * as React from "react";
import Grid from "material-ui/Grid";

interface props {
    faction: number;
}

const commonStyles = {height: 10, display: "inline-block"}

export class DistributionBar extends React.Component<props> {
    render() {
        if (this.props.faction < 0 || this.props.faction > 1) {
            console.error("faction should be in range [0,1]")
        }
        return <div style={{display: "relative", height: 15, width: 96}}>
            <div style={{display: "relative", height: 15}}>
                {
                    this.props.faction === undefined ?
                        <div style={{background: "grey", width: 100 + "%"}}/> :
                        <div>
                            <div style={{
                                ...commonStyles,
                                background: "grey",
                                width: (1 - this.props.faction) * 100 + "%"
                            }}/>
                            <div style={{...commonStyles, background: "green", width: this.props.faction * 100 + "%"}}/>
                        </div>
                }

            </div>
        </div>

    }
}