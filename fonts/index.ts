import type { NextFont } from "next/dist/compiled/@next/font"
import {Roboto_Slab} from "next/font/google"

export const RobotoSlab: NextFont = Roboto_Slab({
    subsets: ["latin"],
    display: "block",
    weight: ["100", "200","300","400","500","600","700","800","900"]
})