import { headerComp } from "../components/headerComp.js";

const Header = document.getElementById("header")

const Render =()=>{
    Header.innerHTML=headerComp;
}

Render();