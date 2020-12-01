const config = require("config");

class Helper {

    static GetKeysFromString = (strInputString) => {

        var col_array = strInputString.split("${");

        var part_num = 0;
        var arrKeys = [];
        while (part_num < col_array.length) {
            arrKeys.push(col_array[part_num]);
            part_num += 1;
        }

        let arrFinalKeys = [];
        arrKeys.forEach((val) => {
            let newVal = val.split("}")[0];
            if (newVal != "") {
                arrFinalKeys.push(newVal);

            }
        });
        return arrFinalKeys;
    }


    static ReplaceKeysWithValues = (strInput, arrKeys) => {

        arrKeys.forEach((key) => {
            let keyVal = Helper.ExtractValueFromConfig(key);
            strInput = strInput.replace("${" + key + "}", keyVal);
        });
        return strInput;
    }

    static ExtractValueFromConfig = (key) => {
        let value = config.get(key);
        if (typeof (value) == "object") {

            value = JSON.stringify(value);
        }

        return value;
    }

}

module.exports = Helper;