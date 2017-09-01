import * as React from "react";
import {CustomLink} from "../../components/CustomLink";
import Button from "material-ui/Button/Button";
import {menuButtonStyle} from "./MenuButtonStyles";

export const MenuButton = (text: string, to: string, fullWidth?: boolean) =>
    (
        <CustomLink to={to}>
            <Button color="contrast" style={{...menuButtonStyle, width: fullWidth ? "100%" : undefined}}>
                {text}
            </Button>
        </CustomLink>
    );