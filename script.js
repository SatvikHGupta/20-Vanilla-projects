const projects = [
"DO_Calculator",
"DO_Clock",
"DO_FaQ",
"DO_FlipGame",
"DO_Img_gal",
"DO_Kanban",
"DO_NavSMenu",
"DO_NY_TIMER",
"DO_Parallax",
"DO_PortF",
"DO_Progress_Circle",
"DO_S_LOGIN",
"DO_S_MP",
"DO_StickyNotes",
"DO_Testimonial_Slider",
"DO_To-Do",
"DO_Weather",
"DO_PriceSlider",
"DO_SQuiz",
"DO_TypeWriterEfftect"
];

const grid = document.getElementById("grid");

projects.forEach(name => {
const a = document.createElement("a");
a.className = "card";
a.href = `projects/${name}/index.html`;
a.innerText = name.replace("DO_", "").replace(/_/g, " ");
grid.appendChild(a);
});
