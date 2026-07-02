function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
    now.toLocaleTimeString("id-ID");

}

setInterval(updateClock,1000);

updateClock();



const quotes=[

"Sedikit progress lebih baik daripada tidak sama sekali. 💙",

"Upload yang konsisten akan mengalahkan upload yang sempurna. 🚀",

"Hari ini upload, besok berkembang. 🌸",

"Jangan menyerah, subscriber pertama juga dimulai dari nol. ✨",

"Kerjakan sekarang, edit nanti, upload hari ini. 🎥"

];

const random=Math.floor(Math.random()*quotes.length);

document.getElementById("quote").innerHTML=quotes[random];

const taskInput = document.getElementById("taskText");
const saveTask = document.getElementById("saveTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function tampilkanTask(){

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        let li=document.createElement("li");

        li.innerHTML=`

        <div class="task-left">

            <input
            type="checkbox"
            ${task.done ? "checked" : ""}>

            <span class="${task.done ? "done":""}">
                ${task.text}
            </span>

        </div>

        <i class="fa-solid fa-trash delete"></i>

        `;

        const checkbox=li.querySelector("input");

        checkbox.addEventListener("change",()=>{

            tasks[index].done=checkbox.checked;

            simpan();

        });

        const hapus=li.querySelector(".delete");

        hapus.addEventListener("click",()=>{

            tasks.splice(index,1);

            simpan();

        });

        taskList.appendChild(li);

    });

}

function simpan(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

    tampilkanTask();

}

saveTask.addEventListener("click",()=>{

    if(taskInput.value==="") return;

    tasks.push({

        text:taskInput.value,

        done:false

    });

    taskInput.value="";

    simpan();

});

tampilkanTask();

const uploadDate=document.getElementById("uploadDate");

const uploadTime=document.getElementById("uploadTime");

const videoTitle=document.getElementById("videoTitle");

const videoType=document.getElementById("videoType");

const saveSchedule=document.getElementById("saveSchedule");

const scheduleList=document.getElementById("scheduleList");

let schedules=JSON.parse(localStorage.getItem("schedules")) || [];

function tampilSchedule(){

    scheduleList.innerHTML="";

    schedules.forEach((item,index)=>{

        let warna="shorts";

        if(item.type=="Video Panjang"){

            warna="long";

        }

        if(item.type=="Live Streaming"){

            warna="live";

        }

        scheduleList.innerHTML +=`

        <div class="schedule-card">

            <div class="schedule-left">

                <h4>${item.title}</h4>

                <p>${item.date} | ${item.time}</p>

            </div>

            <div>

                <span class="badge ${warna}">

                    ${item.type}

                </span>

                <i class="fa-solid fa-trash deleteSchedule"
                onclick="hapusSchedule(${index})"></i>

            </div>

        </div>

        `;

    });

}

saveSchedule.onclick=function(){

    if(videoTitle.value=="") return;

    schedules.push({

        date:uploadDate.value,

        time:uploadTime.value,

        title:videoTitle.value,

        type:videoType.value

    });

    localStorage.setItem("schedules",JSON.stringify(schedules));

    tampilSchedule();

    uploadDate.value="";

    uploadTime.value="";

    videoTitle.value="";

}

function hapusSchedule(index){

    schedules.splice(index,1);

    localStorage.setItem("schedules",JSON.stringify(schedules));

    tampilSchedule();

}

tampilSchedule();

const subsInput=document.getElementById("subsInput");
const viewsInput=document.getElementById("viewsInput");
const watchInput=document.getElementById("watchInput");
const saveProgress=document.getElementById("saveProgress");

let progressData=JSON.parse(localStorage.getItem("progress")) || [];

const ctx=document.getElementById("progressChart");

const chart=new Chart(ctx,{

    type:"line",

    data:{

        labels:[],

        datasets:[

        {

            label:"Subscriber",

            data:[],

            borderColor:"#6CCBFF",

            tension:.4

        },

        {

            label:"Views",

            data:[],

            borderColor:"#9D8BFF",

            tension:.4

        }

        ]

    },

    options:{

        responsive:true

    }

});

function loadProgress(){

    chart.data.labels=[];

    chart.data.datasets[0].data=[];

    chart.data.datasets[1].data=[];

    progressData.forEach((item,index)=>{

        chart.data.labels.push(index+1);

        chart.data.datasets[0].data.push(item.subs);

        chart.data.datasets[1].data.push(item.views);

    });

    chart.update();

}

saveProgress.onclick=function(){

    progressData.push({

        subs:Number(subsInput.value),

        views:Number(viewsInput.value),

        watch:Number(watchInput.value)

    });

    localStorage.setItem("progress",JSON.stringify(progressData));

    loadProgress();

    subsInput.value="";

    viewsInput.value="";

    watchInput.value="";

}

loadProgress();

const incomeDate=document.getElementById("incomeDate");

const incomeType=document.getElementById("incomeType");

const incomeAmount=document.getElementById("incomeAmount");

const saveIncome=document.getElementById("saveIncome");

const incomeList=document.getElementById("incomeList");

const totalIncome=document.getElementById("totalIncome");

let incomes=JSON.parse(localStorage.getItem("income")) || [];

function tampilIncome(){

    incomeList.innerHTML="";

    let total=0;

    incomes.forEach((item,index)=>{

        total+=item.amount;

        incomeList.innerHTML+=`

        <div class="income-card">

            <div>

                <h4>${item.type}</h4>

                <p>${item.date}</p>

            </div>

            <div>

                <strong>

                    Rp ${item.amount.toLocaleString("id-ID")}

                </strong>

                <i
                class="fa-solid fa-trash deleteIncome"
                onclick="hapusIncome(${index})">

                </i>

            </div>

        </div>

        `;

    });

    totalIncome.innerHTML="Rp "+total.toLocaleString("id-ID");

}

saveIncome.onclick=function(){

    if(incomeAmount.value=="") return;

    incomes.push({

        date:incomeDate.value,

        type:incomeType.value,

        amount:Number(incomeAmount.value)

    });

    localStorage.setItem("income",JSON.stringify(incomes));

    tampilIncome();

    incomeDate.value="";

    incomeAmount.value="";

}

function hapusIncome(index){

    incomes.splice(index,1);

    localStorage.setItem("income",JSON.stringify(incomes));

    tampilIncome();

}

tampilIncome();

const subsNow=document.getElementById("subsNow");
const watchNow=document.getElementById("watchNow");
const shortNow=document.getElementById("shortNow");

const saveTarget=document.getElementById("saveTarget");

function updateTarget(){

    let subs=(subsNow.value/1000)*100;
    let watch=(watchNow.value/4000)*100;
    let shorts=(shortNow.value/10000000)*100;

    subs=Math.min(subs,100);
    watch=Math.min(watch,100);
    shorts=Math.min(shorts,100);

    document.getElementById("subsBar").style.width=subs+"%";
    document.getElementById("watchBar").style.width=watch+"%";
    document.getElementById("shortBar").style.width=shorts+"%";

    document.getElementById("subsPercent").innerHTML=Math.round(subs)+"%";
    document.getElementById("watchPercent").innerHTML=Math.round(watch)+"%";
    document.getElementById("shortPercent").innerHTML=Math.round(shorts)+"%";

    localStorage.setItem("target",JSON.stringify({

        subs:subsNow.value,

        watch:watchNow.value,

        shorts:shortNow.value

    }));

}

saveTarget.onclick=updateTarget;

const target=JSON.parse(localStorage.getItem("target"));

if(target){

    subsNow.value=target.subs;

    watchNow.value=target.watch;

    shortNow.value=target.shorts;

    updateTarget();

}

const ideaTitle=document.getElementById("ideaTitle");
const ideaCategory=document.getElementById("ideaCategory");
const ideaDescription=document.getElementById("ideaDescription");
const saveIdeaBtn=document.getElementById("saveIdeaBtn");
const ideaList=document.getElementById("ideaList");

let ideas=JSON.parse(localStorage.getItem("ideas")) || [];

function tampilIdea(){

    ideaList.innerHTML="";

    ideas.forEach((idea,index)=>{

        ideaList.innerHTML+=`

        <div class="idea-card">

            <div>

                <h4>${idea.title}</h4>

                <small>${idea.category}</small>

                <p>${idea.description}</p>

            </div>

            <i
            class="fa-solid fa-trash deleteIdea"
            onclick="hapusIdea(${index})">

            </i>

        </div>

        `;

    });

}

saveIdeaBtn.onclick=function(){

    if(ideaTitle.value=="") return;

    ideas.push({

        title:ideaTitle.value,

        category:ideaCategory.value,

        description:ideaDescription.value

    });

    localStorage.setItem("ideas",JSON.stringify(ideas));

    tampilIdea();

    ideaTitle.value="";

    ideaDescription.value="";

}

function hapusIdea(index){

    ideas.splice(index,1);

    localStorage.setItem("ideas",JSON.stringify(ideas));

    tampilIdea();

}

tampilIdea();

const noteTitle=document.getElementById("noteTitle");
const noteContent=document.getElementById("noteContent");
const saveNote=document.getElementById("saveNote");
const noteList=document.getElementById("noteList");

let notes=JSON.parse(localStorage.getItem("notes")) || [];

function tampilNote(){

    noteList.innerHTML="";

    notes.forEach((note,index)=>{

        noteList.innerHTML+=`

        <div class="note-card">

            <div>

                <h4>${note.title}</h4>

                <p>${note.content}</p>

            </div>

            <i class="fa-solid fa-trash deleteNote"
            onclick="hapusNote(${index})"></i>

        </div>

        `;

    });

}

saveNote.onclick=function(){

    if(noteTitle.value=="") return;

    notes.push({

        title:noteTitle.value,

        content:noteContent.value

    });

    localStorage.setItem("notes",JSON.stringify(notes));

    tampilNote();

    noteTitle.value="";

    noteContent.value="";

}

function hapusNote(index){

    notes.splice(index,1);

    localStorage.setItem("notes",JSON.stringify(notes));

    tampilNote();

}

tampilNote();

function updateStatistik(){

    document.getElementById("statSubs").innerHTML =
        progressData.length ?
        progressData[progressData.length-1].subs : 0;

    document.getElementById("statViews").innerHTML =
        progressData.length ?
        progressData[progressData.length-1].views : 0;

    document.getElementById("statWatch").innerHTML =
        progressData.length ?
        progressData[progressData.length-1].watch+" Jam" : "0 Jam";

    document.getElementById("statUpload").innerHTML =
        schedules.length;

}

updateStatistik();