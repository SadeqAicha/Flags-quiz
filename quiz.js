let flag = document.getElementsByClassName('flag')[0];
let choix = document.getElementById('choix');
let option = document.getElementsByClassName('option');
let next = document.getElementById('next');
let conteneur = document.getElementById('conteneur');
let go = document.getElementById('go');
let flags_num_input = document.getElementById('flags_num_input');
let flags_num_container = document.getElementsByClassName('flags_num_container')[0];
let question_num = document.getElementById('question_num');
let back = document.getElementById('back');
let score_page = document.getElementById('score_page');
let erreur_message=document.getElementById('erreur_message');
let green=document.getElementById('green');


const incorrect_audio = new Audio('audio/incorrect.mp3');
const correct_audio = new Audio('audio/correct.mp3');
//fonction Random number(0 - max)----------------------------------------------------------------------------

function Rand_flags(list,count){
    let listRand=[];
    while(listRand.length!=count){
        let r = Math.floor(Math.random()*(list.length));
        if(!listRand.includes(list[r])){
            listRand.push(list[r]);
        }
    }
    return listRand;
}
//Base de donne   -----------------------------------------------------------------------------------------

let listFlag=['Saudi_Arabia','Palestine','South_Africa','Morocco','Belgium','Bolivia','Brazil','Canada','Japan','Egypt',
    'Syria','Algeria','America','Bahrain','Comoros','Iraq','Jordan','Sweden','Turkey','Ukraine','United_Kingdom',
    'Uruguay','Venezuela','Vietnam','Argentina','Qatar','China','Denmark','Australia','Lebanon','Greece','India',
    'South_Korea','Yemen','Tunisia','Emirates','Sudan','Spain','Italy','Kuwait','Russia','Afghanistan',
    'Albania','Andorra','Armenia','Bangladesh','Bulgaria','Cameroon','Costa_Rica','Croatia','Cuba','Ecuador','Eritrea',
    'Finland','France','Gabon','Gambia','Georgia','Ghana','Iceland','Ireland','Libya','Mauritania','Mexico','Laos',
    'Liberia','Luxembourg','Maldives','Somalia','Madagascar','Portugal','North_Korea','Sri_Lanka','Senegal','Mozambique',
    'Jamaica','Poland','Malta','Monaco','Mali','Nigeria','Oman','Philippines','Kenya','Niger','Kazakhstan','Guatemala',
    'Singapore','Vatican','Malaysia','Ethiopia','Angola','Austria','Benin','Chad','Colombia','Cyprus','Czech','Djibouti',
    'Hungary','Indonesia','Iran','Netherlands','New_Zealand','Norway','Pakistan','Romania','Germany','Switzerland',
    'Serbia','Slovakia','Zambia','Zimbabwe','Azerbaijan','Bahamas','Bosnia__Herzegovina','Chile','Cote_divoire',
    'Dominica','DR_Congo','England','Equatorial_Guinea','Estonia','Grenada','Honduras','Latvia','Liechtenstein',
    'Panama','Paraguay','Peru','Salvador','Scotland','Slovenia','Togo','Yugoslavia','Wales','Thailand',"Belarus",
    "Burundi","Cambodia","Central_African_Republic","Dominican_Republic","Greenland","Haiti","Kyrgyzstan","Lithuania",
    "Malawi","Mongolia","Namibia","Nepal","Nicaragua","Puerto_Rico","Republic_of_China","Rwanda","Sierra_Leone",
    "Tajikistan","Tanzania","Turkmenistan","Uganda"];

let flag_arab_name=['السعودية','فلسطين','جنوب أفريقيا','المغرب','بلجيكا','بوليفيا','البرازيل','كندا','اليابان','مصر',
    'سوريا','الجزائر','أمريكا','البحرين','جزر القمر','العراق','الأردن','السويد','تركيا','أوكرانيا','المملكة المتحدة',
    'أوروغواي','فنزويلا','فيتنام','الأرجنتين','قطر','الصين','الدنمارك','أستراليا','لبنان','اليونان','الهند',
    'كوريا الجنوبية','اليمن','تونس','الإمارات','السودان','إسبانيا','إيطاليا','الكويت','روسيا','أفغانستان',
    'ألبانيا','أندورا','أرمينيا','بنغلاديش','بلغاريا','الكاميرون','كوستاريكا','كرواتيا','كوبا','الإكوادور','إريتريا',
    'فنلندا','فرنسا','الغابون','غامبيا','جورجيا','غانا','آيسلندا','أيرلندا','ليبيا','موريتانيا','المكسيك','لاوس',
    'ليبيريا','لوكسمبورغ','المالديف','الصومال','مدغشقر','البرتغال','كوريا الشمالية','سريلانكا','السنغال','موزمبيق',
    'جامايكا','بولندا','مالطا','موناكو','مالي','نيجيريا','عُمان','الفلبين','كينيا','النيجر','كازاخستان','غواتيمالا',
    'سنغافورة','الفاتيكان','ماليزيا','إثيوبيا','أنغولا','النمسا','بنين','تشاد','كولومبيا','قبرص','التشيك','جيبوتي',
    'هنغاريا (المجر)','إندونيسيا','إيران','هولندا','نيوزيلندا','النرويج','باكستان','رومانيا','ألمانيا','سويسرا',
    'صربيا','سلوفاكيا','زامبيا','زيمبابوي','أذربيجان','جزر البهاما','البوسنة والهرسك','تشيلي','ساحل العاج',
    'دومينيكا','الكونغو الديمقراطية','إنجلترا','غينيا الاستوائية','إستونيا','غرينادا','هندوراس','لاتفيا','ليختنشتاين',
    'بنما','باراغواي','بيرو','السلفادور','اسكتلندا','سلوفينيا','توغو','يوغوسلافيا','ويلز','تايلاندا',"بيلاروس",
    "بوروندي", "كمبوديا", "جمهورية أفريقيا الوسطى", "جمهورية الدومينيكان", "جرينلاند", "هايتي", "قيرغيزستان",
    "ليتوانيا", "مالاوي", "منغوليا", "ناميبيا", "نيبال", "نيكاراغوا", "بورتو ريكو", "جمهورية الصين", "رواندا",
    "سيراليون", "طاجيكستان", "تنزانيا", "تركمانستان", "أوغندا"];


//Les butons go et back-------------------------------------------------------------------------------------

back.onclick=function(){
    conteneur.style.display='none';
    flags_num_container.style.display='grid';
}
go.onclick=function(){
    erreur_message.innerHTML='';
    let flags_num = flags_num_input.value;
    if(flags_num<1 || flags_num>listFlag.length){
        if(flags_num<1) erreur_message.innerHTML=`أدخل رقمًا موجبًا بين 1 و ${listFlag.length}`;   
        else erreur_message.innerHTML=`عدد الأعلام المتاحة هو ${listFlag.length} فقط`; 
        return;
    }
    conteneur.style.display='flex';
    flags_num_container.style.display='none';
    let Myflag=Rand_flags(listFlag, flags_num);

//L'affichage de la question------------------------------------------------------------------------------------------
let count = 0;
let score=0;
function affich(){
    flag.innerHTML='';
    choix.innerHTML='';
    flag.innerHTML=`<img class='flag_img' src="images/flags/${Myflag[count]}.png" alt="${Myflag[count]}">`;
    do{
        randChoix=Rand_flags(listFlag,3);
    }while(randChoix.includes(Myflag[count]));
    randChoix.push(Myflag[count]);
    randChoix = Rand_flags(randChoix,4);
    // randChoix c'est la liste qui contient les 4 choix
    for(let i=0;i<4;i++){
        let j=listFlag.indexOf(randChoix[i]);
        choix.innerHTML+=`<button id='${randChoix[i]}' class='option'>${flag_arab_name[j]}</button>`;
    }
    question_num.innerHTML=`السؤال ${count+1} / ${flags_num}`;
    //pour colorer la reponse
    for(let i=0;i<4;i++){
        option[i].onclick=function(){
            let reponse=document.getElementById(Myflag[count]);
            if (option[i]!=reponse){
                option[i].style.background='#db4343';
                option[i].style.color='#222';
                incorrect_audio.play();
            }
            else {score++; correct_audio.play();}
            reponse.style.background='#50bf50';
    //pour disactiver la capacite de clicker
            for(let j=0;j<4;j++)
                option[j].disabled=true;
    }}
}
affich();
//next button et score--------------------------------------------------------------------------------------
next.onclick=function(){
    if(count<=flags_num-2){
        if(count!=flags_num-1){
            count++;
        affich();
        }
    }
    //Pour la page de Score
    else{
        conteneur.style.display='none';
        score_page.innerHTML+=`
            <p>نتيجتك : ${score}/${Myflag.length} </p>
            <a href="quiz.html"><button>العب مجددا</button></a>`;
        score_page.style.display='flex';
    }
}
}
//---------------------------------------------------------------------------------------------------------
