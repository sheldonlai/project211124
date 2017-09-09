import * as React from 'react';
import {CSSProperties} from 'react';
import Menu, {MenuItem} from 'material-ui/Menu';
import {ListItem, ListItemText} from 'material-ui/List';
import Button from "material-ui/Button";
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

interface props {
    KeyTerms: string[];
    InputSentence: string;
}

export class SentenceStringBolder extends React.Component<props> {
    Splitter: string[];
    currentHead: number;
    ProcessedKeyTerms: string[];
    ProcessedInputSentence: string;
    constructor(props) {
        super(props);
        this.ProcessedKeyTerms = this.props.KeyTerms.map((word) => {return word.toLowerCase()});
        this.ProcessedInputSentence = this.props.InputSentence.toLowerCase();
        this.Splitter = this.props.InputSentence.split("");
    }

    render() {
        let KeyTermLocations: any[] = this.ProcessedKeyTerms.map((word) => { //Calculate the starting and ending locations of each key terms
            let head: number = this.ProcessedInputSentence.indexOf(word);
            return {
                begin: head,
                end: head + word.length - 1,
            }
        });
        if(KeyTermLocations.length > 0) this.currentHead = 0; //Assign a pointer to point to the current key term to be bolded
        else this.currentHead = -1;
        return (
                <Typography>
                    {
                        this.Splitter.map((c, indx) => {
                            if(this.currentHead > -1){
                                //Point to the next key term if the current character out-ranges the current key term
                                if(indx > KeyTermLocations[this.currentHead].end && this.currentHead+1 < KeyTermLocations.length){
                                    this.currentHead++;
                                }
                                //If the current character is in range of current key term's location, bold the character
                                if(indx >= KeyTermLocations[this.currentHead].begin && indx <= KeyTermLocations[this.currentHead].end){
                                    return <strong>{c}</strong>
                                }
                                //else return the normal unbolded character
                                else{
                                    return c;
                                }
                            }
                            //If input sentence doesn't contain any of the key terms, return normal unbolded characters.
                            else{
                                return c;
                            }
                        })
                    }
                </Typography>
        )
    }
}
