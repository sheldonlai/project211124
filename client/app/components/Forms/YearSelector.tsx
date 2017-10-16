import * as React from 'react';
import _ = require("lodash");
import {DropDownSelect, DropDownSelectData} from "./DropDownSelect";


interface props{
    yearMin: number;
    yearMax: number;
    onChange: (year) => void;
    defaultYear?: number;
}

interface state{
    year: number;
}

export class YearSelector extends React.Component<props, state>{
    yearRange: number[];
    yearContainer: DropDownSelectData[];
    constructor(props){
        super(props);

        let currentYear = (new Date()).getFullYear();
        this.yearRange = _.range(this.props.yearMin, this.props.yearMax);
        this.yearContainer = this.yearRange.map(year => {
            return {
                text: year.toString(),
                value: year,
            }
        });

        this.state = {
            year: this.props.defaultYear? this.props.defaultYear: currentYear,
        }
    }

    render(){

        return(
            <div>
                <DropDownSelect
                    data={this.yearContainer}
                    value={this.state.year}
                    placeholder="Year"
                    onChange={(year) =>{
                        this.setState({year: year});
                        this.props.onChange(year);
                    }}
                />
            </div>
        )
    }
}