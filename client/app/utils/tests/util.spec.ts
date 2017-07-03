import {CSSProperties} from "react";
import {applyStylesToDefaultStyle} from "../utils";
/**
 * Created by SHELDON on 7/3/2017.
 */
test('map key onto object', () => {
    let obj: CSSProperties =  {
        border: "1px white solid",
        color: "red",
        background: "green"
    };
    let newStyle : CSSProperties = {
        fontFamily: "calibri",
        color: "blue"
    };
    applyStylesToDefaultStyle(obj, newStyle);

    expect(obj.fontFamily).toBe("calibri");
    expect(obj.color).toBe("blue");
    expect(obj.background).toBe("green");
});