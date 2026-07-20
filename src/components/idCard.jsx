import React from "react";

export default function IdCard() {
    return (
            <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" role="img">
<title>Student ID card for Rendra Gadhing, class XII PPLG 3</title>
<defs>
<clipPath id="cardClip">
<rect x="0" y="0" width="800" height="600" rx="20"/>
</clipPath>
</defs>

<rect x="0" y="0" width="900" height="600" rx="20" fill="#17181C"/>

<g clip-path="url(#cardClip)">


<rect x="28" y="28" width="110" height="12" fill="#FFF4E0"/>
<rect x="28" y="28" width="12" height="110" fill="#FFF4E0"/>

<text x="760" y="52" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="13" letter-spacing="3" fill="#C9A227">STUDENT ID</text>


<rect x="50" y="170" width="220" height="220" rx="8" fill="#1F2024" stroke="#C9A227" stroke-width="2"/>
<circle cx="160" cy="245" r="42" fill="#3A3B40"/>
<path d="M108,372 C108,300 212,300 212,372 Z" fill="#3A3B40"/>


<text x="310" y="222" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#F7F3E8">Rendra Gadhing</text>


<rect x="310" y="238" width="440" height="2" fill="#C9A227"/>


<text x="310" y="274" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="#D9B44A">XII PPLG 3</text>


<text x="310" y="308" font-family="Arial, Helvetica, sans-serif" font-size="12" letter-spacing="2" fill="#8B8A82">DEPARTMENT</text>


<text x="310" y="332" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#E8E4D8">Pengembangan Perangkat Lunak</text>


<rect x="0" y="584" width="800" height="16" fill="#C9A227"/>

</g>
</svg>
    )
}