import * as React from "react";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button/Button";
interface state {
    json: string;
    error: string;
}
export class AdminDashboardComp extends React.Component<any, state> {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            json: "{}",
        }
    }

    onChange = (event) => {
        this.setState({json: event.target.value});
        // try{
        //     let json = JSON.parse(event.target.value);
        //
        //     let text = JSON.parse(this.syntaxHighlight(json));
        //     console.log(text)
        //     this.setState({json: text});
        // } catch (err) {
        //     console.log(err);
        //
        // }

    };

    syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
    onFormat = () => {
        let result = JSON.stringify(JSON.parse(this.state.json), null, 2)
        this.setState({json: result});
    };

    render() {
        return (
            <div>
                <Typography type="body1"></Typography>
                <Button onClick={this.onFormat}>Format</Button>
                <textarea style={{width: "100%", minHeight: 300}} value={this.state.json} onChange={this.onChange}/>
            </div>
        )
    }
}