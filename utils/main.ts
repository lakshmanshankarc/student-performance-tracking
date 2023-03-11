import { userDetailsType } from "@/types/userDetails";
import axios from "axios";
import { firstCSI, firstCSII, secondCSI, secondCSII, thirdCSI, thirdCSII } from "@/types/collegeTables";
export const FirstCSI: firstCSI = {
    id: "",
    tamil1: "",
    english1: "",
    dfa: "",
    maths1: "",
    cprogramming: "",
    clab: "",
    testname: "",
}
export const FirstCSII: firstCSII = {
    id: "",
    tamil2: "",
    english2: "",
    cpp: "",
    discretemath: "",
    ib: "",
    cpplab: "",
    testname: "",
}

export const SecondCSI: secondCSI = {
    id: "",
    java: "",
    ds: "",
    cbot: "",
    seandspm: "",
    javalab: "",
    testname: "",
}

export const SecondCSII: secondCSII = {
    id: "",
    linux: "",
    ssos: "",
    baccounting: "",
    linuxlab: "",
    testname: "",
}

export const ThirdCSI: thirdCSI = {
    id: "",
    dbms: "",
    vb: "",
    python: "",
    stesting: "",
    vbdbmslab: "",
    testname: "",
}

export const ThirdCSII: thirdCSII = {
    id: "",
    project: "",
    stestinglab: "",
    cgmultimedia: "",
    cgmultimedialab: "",
    webtech: "",
    iot: "",
    testname: "",
}

export async function resolveTableName() {
    console.log("is the name");
    const res = await axios.get("/api/user/getuserdetails");
    const user: { user: userDetailsType } = (await res).data;
    const name = user.user.tablename;

    switch (name) {
        case "FirstCSI":
            return FirstCSI;
        case "FirstCSII":
            return FirstCSII;
        case "SecondCSI":
            return SecondCSI;
        case "SecondCSII":
            return SecondCSII;
        case "ThirdCSI":
            return ThirdCSI;
        case "ThirdCSII":
            return ThirdCSII;
        default:
            return FirstCSI;
    }
}

