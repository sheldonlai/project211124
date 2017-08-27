import * as React from 'react';
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";

export class TermsAndCondition extends React.Component {
    render () {
        return (
            <div style={
                {
                    background: "#efefef",
                    maxHeight: 500,
                    padding: 20,
                    overflowY: "scroll",
                    border: "#d5d5d5 2px solid"
                }}>
                <Typography type="title" style={{margin: 10}}>
                    Protecting Other People's Rights
                </Typography>
                <Typography type="body1">
                    We respect other people's rights, and expect you to do the same.
                    You will not post content or take any action on Facebook that infringes or violates someone else's rights or otherwise violates the law.
                    We can remove any content or information you post on Facebook if we believe that it violates this Statement or our policies.
                    We provide you with tools to help you protect your intellectual property rights. To learn more, visit our How to Report Claims of Intellectual Property Infringement page.
                    If we remove your content for infringing someone else's copyright, and you believe we removed it by mistake, we will provide you with an opportunity to appeal.
                    If you repeatedly infringe other people's intellectual property rights, we will disable your account when appropriate.
                    You will not use our copyrights or Trademarks or any confusingly similar marks, except as expressly permitted by our Brand Usage Guidelines or with our prior written permission.
                    If you collect information from users, you will: obtain their consent, make it clear you (and not Askalot) are the one collecting their information, and post a privacy policy explaining what information you collect and how you will use it.
                    You will not post anyone's identification documents or sensitive financial information on Facebook.
                    You will not tag users or send email invitations to non-users without their consent. Facebook offers social reporting tools to enable users to provide feedback about tagging.
                </Typography>
            </div>
        )
    }
}

