'use strict';
const list=document.getElementById('items'),dialog=document.getElementById('experience'),body=document.getElementById('experience-body'),audio=document.getElementById('song');
const A='assets/',S=window.SURPRISES;const E='assets/elements/';const flowerPhotos=Array.from({length:6},(_,i)=>E+'flower-'+(i+1)+'.png');function art(name,cls=''){return `<img class="clay-art ${cls}" src="${E}${name}.png" alt="" loading="lazy">`};let current='',spinAngle=0,spinning=false,flames=false,choice='',openLetters=new Set(),openStars=new Set(),openFlowers=new Set(),openCards=new Set(),openMail=new Set(),wheelWon=new Set();
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function btn(text,fn,cls=''){return `<button type="button" class="puffy ${cls}" data-act="${fn}">${text}</button>`}
function icon(id){return `<img class="exp-icon" src="${A}icons/${id}.png" alt="">`}
function note(title,text,secret=false){return `<div class="note ${secret?'secret':''} stage-enter"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(text)}</p></div>`}
function scene(title,lead,content){return `${icon(current)}<h2 class="exp-title">${title}</h2><p class="exp-lead">${lead}</p><div class="scene">${content}</div>`}
function saveSet(key,set){try{localStorage.setItem('princess-v5-'+key,JSON.stringify([...set]))}catch{}}
function loadSet(key){try{return new Set(JSON.parse(localStorage.getItem('princess-v5-'+key)||'[]'))}catch{return new Set()}}
openLetters=loadSet('letters');openStars=loadSet('stars');openFlowers=loadSet('flowers');openCards=loadSet('cards');openMail=loadSet('mail');wheelWon=loadSet('wheel');
S.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.className='item';b.style.setProperty('--i',i);b.setAttribute('aria-label',s.title);b.innerHTML=`<span class="icon-wrap"><img src="${A}icons/${s.id}.png" alt="" loading="${i<4?'eager':'lazy'}"></span><span class="name">${s.title}</span><span class="desc">${s.desc}</span>`;b.onclick=()=>open(s.id);list.append(b)});
function open(id){current=id;dialog.showModal();render()}
function close(){audio.pause();dialog.close()}
document.getElementById('close').onclick=close;dialog.addEventListener('click',e=>{if(e.target===dialog)close()});dialog.addEventListener('close',()=>audio.pause());
const wheelGifts=[['🧸','خرس کوچولو','این خرس کوچولو اومده که امروز یه لبخند ازت بگیره. امیدوارم مأموریتش موفق باشه 😂💕'],['🌷','دسته‌گل صورتی','یه دسته‌گل مجازی برای یه آدم واقعی که کلی ویژگی قشنگ داره 🌸'],['⭐','ستاره شانس','تبریک! جایزه‌ت یه عالمه اتفاق خوبه که امیدوارم خیلی زود برات بیفتن ✨'],['💌','نامه مخفی','یه اعتراف کوچولو: بعضی وقتا حتی یه پیام ساده ازت می‌تونه روزمو قشنگ‌تر کنه.'],['🍰','کیک توت‌فرنگی','این کیک هیچ کالری‌ای نداره، ولی امیدوارم به اندازه یه کیک واقعی خوشحالت کنه 😂🍓'],['👑','تاج پرنسس','این تاج رسماً به پرنسس تعلق می‌گیره. لطفاً با افتخار تحویل گرفته بشه 🎀'],['🎈','بادکنک قلبی','یه قلب کوچولو که فقط اومده بگه بودنت قشنگه 💗'],['🎁','جعبه شانسی','این یکی یه جایزه مخفیه! حق انتخاب آهنگ بعدی با توئه؛ یه کوپن موزیک‌بازی 🎶']];
const flowerData=[['لاله صورتی','نمی‌دونم خودت چقدر حواست هست، ولی لبخندت از اون چیزاست که خیلی راحت می‌تونه حال آدمو بهتر کنه. امیدوارم همیشه دلیلی برای لبخند زدن داشته باشی.'],['گل مینا','یکی از چیزای قشنگی که توی شخصیتت هست، مهربونیه. حتی توی چیزای کوچیک هم می‌شه حسش کرد، و این واقعاً ارزشمنده.'],['رز صورتی','یه سری آدما بدون اینکه تلاش کنن شبیه کسی باشن، شخصیت مخصوص خودشونو دارن. این ویژگی تو رو خیلی دوست دارم.'],['اسطوخودوس','بعضی وقتا یه گفت‌وگوی ساده باهات می‌تونه از شلوغی یه روز کم کنه. این حس آرومی که بعضی لحظه‌ها می‌دی خیلی قشنگه.'],['شکوفه گیلاس','بعضی از حرفا و واکنش‌هات انقدر بامزه‌ان که حتی بعد از تموم شدن مکالمه هم یادم می‌مونن و لبخند می‌زنم 😂🌸'],['گل کاسموس صورتی','اینکه برای خودت ارزش قائلی، حد و مرزهات رو می‌شناسی و روی چیزایی که برات مهمن می‌ایستی، یکی از ویژگی‌های قابل احترامته.']];
const memories=[['اولین آشنایی 🌷','از یه پیام ساده شروع شد...','کی فکرشو می‌کرد یه گفت‌وگوی ساده درباره ادیت ویدئو، شروع یه آشنایی قشنگ بشه؟ اون روز فقط یه سؤال معمولی پرسیدم، بدون اینکه بدونم قراره بعدها این چت برام یه خاطره خاص بشه. خوشحالم که اون پیام رو فرستادم و فرصتی شد که بیشتر بشناسمت. 💗','38579.jpg'],['آهنگ‌های مورد علاقه‌م 🎶','','یه روز از یه گفت‌وگوی ساده رسیدیم به حرف زدن درباره آهنگ‌ها... این سه تا ویس رو دوست داشتم اینجا نگه دارم، چون یادآور یکی از گفت‌وگوهای قشنگمونه. 🎧','38580.jpg'],['یه حرف که یادم موند 💌','','بعضی حرفا رو آدم فقط یه بار می‌شنوه، ولی مدت‌ها یادش می‌مونه. اون روز وقتی گفتی چقدر برای گزارشم زحمت کشیدم و برام آرزوی خوشحالی کردی، واقعاً خوشحال شدم. ممنونم که اون لحظه رو برام قشنگ‌تر کردی. 🌷','38582.jpg'],['یه روز خاص 🎀','','اون روز دلم می‌خواست یه تبریک ساده، یه ذره متفاوت‌تر باشه. برای همین با کلی شیطنت شروع کردم به پیام دادن 😂🎀 امیدوارم این روز همیشه برات پر از اتفاقای خوب باشه.','38583.jpg']];
const cards=[['یه اعتراف کوچولو 🤭','بعضی وقتا وقتی یه پیام ازت میاد، ناخودآگاه لبخند می‌زنم. گفتم بدونی! 🌷'],['یه چیز قشنگ درباره تو 🌸','اینکه شخصیت خودتو داری و برای چیزایی که برات مهمن ارزش قائلی، واقعاً قابل احترامه.'],['یه حقیقت بامزه 😂','گاهی وسط یه روز معمولی، یاد یکی از حرفای بامزه‌ت می‌افتم و بی‌دلیل می‌خندم 😂'],['اگه یه آرزو داشتم ✨','آرزو می‌کردم روزای پیش روت پر از اتفاقای خوب و خبرای خوشحال‌کننده باشه.'],['یه تشکر کوچولو 💌','مرسی برای وقتایی که با حوصله حرف زدی، چیزی تعریف کردی یا یه گفت‌وگوی ساده رو قشنگ‌تر کردی.'],['یه ویژگی دوست‌داشتنی 🎀','اینکه می‌تونی هم بامزه و شیطون باشی و هم وقتی چیزی برات مهمه، جدی و محکم ازش حرف بزنی، خیلی قشنگه.'],['یه قول واقعی 🌷','می‌خوام بیشتر حواسم به حرفام و رفتارم باشه و به‌جای حرفای قشنگِ بی‌پشتوانه، با رفتارم قابل اعتماد بودن رو نشون بدم.'],['آخرین کارت 💗','خوشحالم که فرصت آشنا شدن باهات رو داشتم. امیدوارم هر اتفاقی که پیش میاد، همیشه با احترام و صداقت با هم حرف بزنیم.']];
const stars=[['یه شب آروم 🌙','آرزو می‌کنم یه شب بدون عجله و نگرانی، کلی حرف قشنگ برای گفتن داشته باشیم و زمان رو فراموش کنیم.'],['یه فیلم دونفره 🎬','یه شب یه فیلم انتخاب کنیم، هم‌زمان ببینیمش و وسطش هی درباره شخصیت‌ها نظر بدیم 😂🍿'],['یه کافه قشنگ ☕','امیدوارم یه روز فرصت بشه توی یه کافه دنج بشینیم و درباره هزار تا موضوع معمولی و غیرمعمولی حرف بزنیم.'],['یه آهنگ مشترک 🎵','آرزو می‌کنم یه روز یه آهنگ پیدا کنیم که هر وقت شنیدیمش، یاد یه خاطره قشنگ بیفتیم.'],['یه روز پر از خنده 🌷','آرزو می‌کنم روزهای بیشتری داشته باشی که از ته دل بخندی؛ چه کنار هم باشیم، چه از راه دور.'],['یه عکس یادگاری 📸','امیدوارم یه روز یه عکس قشنگ از یه لحظه واقعی داشته باشیم که هر بار دیدیمش لبخند بزنیم.'],['یه آرزوی مهم‌تر 💗','آرزو می‌کنم بتونیم با صداقت، احترام و آرامش حرف بزنیم و لحظه‌های خوبی بسازیم؛ بدون عجله و بدون فشار.']];
const mails=[['یه لبخند کوچولو','سلام به پرنسسی که این نامه رو پیدا کرده! 🤭 امیدوارم امروز یه اتفاق کوچولوی قشنگ غافلگیرت کنه؛ از اون اتفاقایی که بی‌اختیار لبخند میاری.'],['یه اعتراف بامزه','یه اعتراف کوچولو: بعضی وقتا برای اینکه یه چیزی رو برات تعریف کنم، توی ذهنم چند بار جمله‌ش رو عوض می‌کنم... آخرشم یه چیز کاملاً متفاوت می‌گم 😂'],['یه یادآوری قشنگ','خواستم یادت بندازم که لازم نیست همیشه همه‌چی عالی پیش بره تا یه روز ارزشمند باشه. امیدوارم حتی توی روزای شلوغ هم یه گوشه کوچولو برای آرامش خودت پیدا کنی. 🌷'],['یه تشکر ساده','مرسی برای وقتایی که یه گفت‌وگوی معمولی رو با شوخی‌ها و حرفات قشنگ‌تر کردی. شاید چیز بزرگی به نظر نیاد، ولی برای من خاطره‌های خوبی ساخته. 💗'],['برای روزهای آینده','نمی‌دونم روزای بعد چه اتفاقایی می‌افتن، ولی امیدوارم پر از آرامش، خنده و خبرای خوب باشن. و امیدوارم هر چیزی که قراره ساخته بشه، با صداقت و احترام ساخته بشه. ✨']];
const letter=`راستش نمی‌دونم وقتی داری این نامه رو می‌خونی، چه حسی داری. شاید لبخند روی لبات باشه، شاید هم با خودت بگی این پسره دیگه چه چیزایی درست کرده! 😂

ولی بذار یه چیزی رو بهت بگم...

از وقتی وارد زندگیم شدی، یه سری چیزای خیلی معمولی برام قشنگ‌تر شدن.

مثلاً یه پیام ساده، یه گفت‌وگوی طولانی، یه شوخی بی‌موقع یا حتی وقتایی که درباره اتفاقای کوچیک روزت برام تعریف می‌کنی.

شاید خودت متوجه نباشی، ولی بعضی از همین لحظه‌های کوچیک، تبدیل شدن به قسمت‌های دوست‌داشتنی روزای من.

می‌دونی مبینا...

یه چیزی که درباره تو خیلی دوست دارم اینه که خودتی.

با همون شیطنت‌های بامزه‌ت، با خنده‌هات، با حرف زدنت، با اون وقتایی که جدی می‌شی و با تمام ویژگی‌های کوچیک و بزرگی که تو رو از بقیه متفاوت می‌کنن.

من فقط لحظه‌های خندیدن و خوشحال بودنت رو دوست ندارم؛ دلم می‌خواد توی روزایی که خسته‌ای یا حوصله هیچ‌چیزی رو نداری هم بتونی راحت خودت باشی.

بدون اینکه لازم باشه همیشه بخندی یا حالت خوب باشه.

راستش بعضی وقتا دلم می‌خواد فاصله بینمون برای چند دقیقه هم که شده ناپدید بشه.

مثلاً یه روز توی یه کافه کوچولو بشینیم، یه نوشیدنی سفارش بدیم و انقدر درباره چیزای مختلف حرف بزنیم که یادمون بره چقدر زمان گذشته.

یا یه روز بی‌هیچ برنامه خاصی قدم بزنیم، به چیزای مسخره بخندیم و آخرش با خودمون بگیم چه روز قشنگی بود.

شاید اینا آرزوهای خیلی بزرگی نباشن، ولی برای من قشنگن؛ چون تو توی اون لحظه‌هایی.

یه اعتراف کوچولو هم بکنم؟

من از تصور اینکه یه روز بتونم لبخندت رو از نزدیک ببینم، واقعاً خوشحال می‌شم.

نه به خاطر یه اتفاق عجیب یا یه برنامه فوق‌العاده...

فقط به خاطر اینکه اون لحظه واقعیه.

مبینا...

نمی‌دونم آینده دقیقاً چه شکلی می‌شه و قرار نیست ادعا کنم همه‌چیز رو از قبل می‌دونم.

ولی یه چیزی رو خوب می‌دونم:

آشنایی با تو برای من یه اتفاق معمولی نبود.

تو تبدیل شدی به یکی از آدم‌هایی که بودنشون، حرف زدنشون و حتی خاطره‌های کوچیکشون برای آدم ارزش پیدا می‌کنه.

تمام این دنیای کوچولویی که دیدی رو با فکر کردن به لبخندت ساختم.

هر گل، هر ستاره، هر هدیه و هر جزئیات کوچیکش یه بهونه بود برای اینکه چند دقیقه حالت خوب بشه.

و حالا که رسیدی به آخرش، می‌خوام یه چیز رو بدونی...

بین تمام چیزای قشنگی که سعی کردم توی این سایت بسازم، قشنگ‌ترینش برای من خود تویی.

امیدوارم روزای پیش روت پر از آرامش، خنده‌های واقعی، اتفاقای خوب و آرزوهایی باشه که یکی‌یکی بهشون می‌رسی.

و امیدوارم منم فرصت داشته باشم کنار بعضی از اون لحظه‌های قشنگ باشم.

خوشحالم که تو رو شناختم، مبینا.

خیلی بیشتر از چیزی که شاید با این چند خط بشه گفت...

با یه عالمه حس قشنگ، برای تو. 🎀💗`;
let viewIndex=null,letterOpen=false,mailOpen=false,cakeStage=0,wheelSelected=null,showSecret=false,boxOpen=false;
function render(){let html='';switch(current){
case 'wheel':{let rem=wheelGifts.map((_,i)=>i).filter(i=>!wheelWon.has(i));html=scene('گردونه کادوهای پرنسس','یه هدیه شانسی منتظرته؛ همه هدیه‌ها رو می‌تونی یکی‌یکی بگیری!',`<div class="wheel-pointer">▼</div><div class="wheel-disc" id="wheelDisc" style="transform:rotate(${spinAngle}deg)">${wheelGifts.map((g,i)=>`<span style="--a:${i*45}deg">${art(['bear','flower','star','envelope','cake','crown','balloon','gift'][i],'wheel-gift')}</span>`).join('')}</div><div class="progress">${wheelWon.size} از ۸ هدیه پیدا شده</div>${btn('گردونه رو بچرخون ♡','spin')}${wheelSelected!==null?art(['bear','flower','star','envelope','cake','crown','balloon','gift'][wheelSelected],'result-art')+note(wheelGifts[wheelSelected][1],wheelGifts[wheelSelected][2]):''}${rem.length===0?btn('دوباره از اول ♡','resetwheel','secondary'):''}`);break}
case 'envelope':html=scene('پاکت‌نامه مرموز پرنسس','یه نامه کوچولو برای پرنسس رسیده! 💌',`${art('envelope','hero-art')}${btn(boxOpen?'نامه رو ببند ♡':'مهر قلبی رو باز کن ♡','envelope')}${boxOpen?note('یه سری حرفای نگفته...',`راستش بعضی وقتا یه سری چیزا هست که شاید توی حرفای روزمره بهت نگم.\n\nمثلاً اینکه حرف زدن باهات، حتی درباره معمولی‌ترین اتفاقای روز، می‌تونه خیلی قشنگ باشه.\n\nیا اینکه بعضی وقتا بی‌اختیار منتظر می‌مونم ببینم چی می‌خوای تعریف کنی.\n\nیه چیز دیگه هم هست...\n\nشاید همیشه بلد نباشم احساساتمو درست بیان کنم، ولی اینو می‌دونم که آشنایی باهات یکی از اتفاقای قشنگی بوده که برام افتاده.\n\nو دلم می‌خواد با دقت و صداقت بیشتری از این آشنایی مراقبت کنم.\n\nهمین، فقط خواستم بدونی. 🌷`)+btn('مهر قلبی مخفی ♡','envelope-secret')+(showSecret?note('یه یادداشت مخفی','راستی... امیدوارم موقع خوندن این نامه حتی برای چند ثانیه هم که شده لبخند زده باشی. چون تمام هدف این نامه همین بود. 🌸',true):''):''}`);break;
case 'garden':html=scene('باغ گل‌های پرنسس','شش گل سه‌بعدی، شش تا حرف قشنگ؛ هر گل رو لمس کن 🌷',`<div class="scene-grid flower-choices">${flowerData.map((f,i)=>`<button class="mini-choice ${openFlowers.has(i)?'seen':''}" data-act="flower" data-n="${i}"><img class="flower-photo" src="${flowerPhotos[i]}" onerror="this.onerror=null;this.src='${E}flower.png'" alt="${f[0]}" loading="lazy"><span>${f[0]} ${openFlowers.has(i)?'♡':''}</span></button>`).join('')}</div><div class="progress">${openFlowers.size} از ۶ گل</div>${viewIndex!==null?note(flowerData[viewIndex][0],flowerData[viewIndex][1]):''}${openFlowers.size===6?`<img class="bouquet-illustration" src="${E}bouquet.png" alt="دسته‌گل شش‌تایی پرنسس">${note('دسته‌گل پرنسس','کاش می‌شد این گل‌ها رو واقعی تقدیمت کنم. فعلاً این باغ کوچولو رو داشته باش تا اون روز 🌷',true)}`:''}`);break;
case 'music':html=scene('موزیک‌باکس جادویی پرنسس','بعضی حرفا رو می‌شه با یه آهنگ قشنگ‌تر گفت... 💗',`<div class="music-stage">${art('musicbox','musicbox-art')}${art('ballerina',!audio.paused?'ballerina dancing':'ballerina')}</div>${note('یه آهنگ کوچولو برای پرنسس',`این آهنگ رو گذاشتم اینجا که هر وقت خواستی، چند دقیقه از شلوغی دنیا فاصله بگیری.\n\nامیدوارم موقع گوش دادنش حس خوبی داشته باشی.\n\nشاید نتونم همیشه حرفامو اون‌جوری که باید بگم، ولی دوست داشتم یه آهنگ قشنگ هم توی این باغ کوچولوی سورپرایزها منتظرت باشه.\n\nامیدوارم دوستش داشته باشی. 🎶💗`)}${btn(audio.paused?'پخش آهنگ ♡':'توقف آهنگ ♡','music-toggle')}<p class="toast">موسیقی فقط با لمس دکمه پخش می‌شه.</p>`);break;
case 'memories':html=scene('جعبه خاطرات پرنسس','چهار تا لحظه واقعی که دوست داشتم اینجا نگه دارم 💗',`<div class="scene-grid">${memories.map((m,i)=>`<button class="mini-choice" data-act="memory" data-n="${i}"><img src="${A+m[3]}" alt="خاطره ${i+1}" style="width:95px;height:90px;object-fit:cover;border:4px solid white;border-radius:12px"><span>${m[0]}</span></button>`).join('')}</div>${viewIndex!==null?`<img class="memory-photo" src="${A+memories[viewIndex][3]}" alt="اسکرین‌شات خاطره">${note(memories[viewIndex][0],(memories[viewIndex][1]?memories[viewIndex][1]+'\n\n':'')+memories[viewIndex][2])}`:''}${note('چهار لحظه دوست‌داشتنی','همه اینا شاید چند تا عکس و پیام ساده باشن، ولی پشت هر کدوم یه لحظه واقعی بوده. خوشحالم که این خاطره‌ها رو داریم. امیدوارم روزهای قشنگ بیشتری هم در پیش باشه. 🌷',true)}`);break;
case 'cards':html=scene('کارت‌های برگردوندنی پرنسس','هشت تا کارت کوچولو؛ هر کدوم یه حرف پنهون دارن 🎀',`<div class="scene-grid">${cards.map((c,i)=>`<button class="mini-choice ${openCards.has(i)?'seen':''}" data-act="card" data-n="${i}"><span class="emoji-3d">${art('card','mini-art')}</span><span>${c[0]}</span></button>`).join('')}</div><div class="progress">${openCards.size} از ۸ کارت</div>${viewIndex!==null?note(cards[viewIndex][0],cards[viewIndex][1]):''}${openCards.size===8?note('کارت نهم مخفی','اگه تا اینجا همه کارت‌ها رو دیدی، پس هشت تا از حرفای کوچولوم رو خوندی. امیدوارم حداقل یکیشون یه لبخند کوچولو آورده باشه روی لبت. مرسی که براشون وقت گذاشتی، پرنسس. 🌷',true):''}`);break;
case 'sky':html=scene('آسمون آرزوهای پرنسس','هفت ستاره کوچولو که هر کدوم یه آرزو رو نگه داشتن ✨',`<div class="sky-scene"><div class="sky-moon">${art('moon','moon-art')}</div><div class="sky-cloud">${art('cloud','cloud-art')}</div><div class="sky-stars">${stars.map((s,i)=>`<button class="mini-choice ${openStars.has(i)?'seen':''}" data-act="star" data-n="${i}" aria-label="ستاره ${i+1}">${art(openStars.has(i)?'star-seen':'star','star-art')}</button>`).join('')}</div></div><div class="progress">${openStars.size} از ۷ ستاره</div>${viewIndex!==null?note(stars[viewIndex][0],stars[viewIndex][1]):''}${openStars.size===7?note('یه آرزوی کوچولوی دیگه... ♡','می‌دونی قشنگی آرزوها چیه؟ اینکه لازم نیست همه‌شون همین امروز اتفاق بیفتن. بعضی چیزای خوب با زمان، صبر و قدم‌های کوچیک ساخته می‌شن. امیدوارم هر چی برامون خوبه، به قشنگ‌ترین شکل ممکن اتفاق بیفته. 🌷',true):''}`);break;
case 'cake':html=scene('کیک آرزوهای پرنسس','یه کیک کوچولو که منتظره یه آرزوی قشنگ بکنی 🎂',`<div class="cake-stage">${art('cake','cake-main')}<div class="cake-candles ${cakeStage===1?'lit':''}"><i></i><i></i><i></i><i></i><i></i></div></div>${cakeStage===0?`${note('این کیک یه فرق کوچولو داره','قرار نیست تولدی رو جشن بگیریم؛ قراره یه آرزوی قشنگ بکنیم! 🎀')}${btn('شمع‌ها رو روشن کن ♡','cake-light')}`:cakeStage===1?`${note('وقت یه آرزوی قشنگه ✨','حالا یه لحظه چشماتو ببند و یه آرزو کن... هر آرزویی که دلت می‌خواد. لازم نیست به هیچ‌کس بگیش. بعضی آرزوها وقتی فقط توی دل آدم می‌مونن، قشنگ‌ترن. 💗')}${btn('فوت کن ♡','cake-blow')}`:`${note('آرزوت رفت پیش ستاره‌ها! 🌟','خب خب! شمع‌ها خاموش شدن! امیدوارم اون چیزی که توی دلت آرزو کردی، یه روز به قشنگ‌ترین شکل ممکن اتفاق بیفته. 🌷')}${btn('جعبه هدیه رو باز کن 🎁','cake-gift')}${showSecret?note('یه هدیه کوچولو برای پرنسس ♡',`این جعبه کوچولو یه چیز خیلی خاص توی خودش داره...\n\nنه طلاست، نه یه هدیه گرون‌قیمت.\n\nفقط یه آرزوی صمیمیه:\n\nامیدوارم روزهایی داشته باشی که از ته دل خوشحال باشی، به چیزایی که دوست داری برسی و همیشه دلیلی برای لبخند زدن پیدا کنی.\n\nو اگه یه روزی فرصت شد، خوشحال می‌شم یکی از اون لبخندها رو از نزدیک ببینم. 🎀💗`,true):''}${btn('یه آرزوی دیگه بکن ♡','cake-reset','secondary')}`}`);break;
case 'mail':html=scene('صندوق پستی جادویی پرنسس','یه صندوق پستی کوچولو که چند تا حرف قشنگ توش منتظرته... 💌',`${art('mailbox','hero-art')}${btn(mailOpen?'درِ صندوق رو ببند ♡':'پرچم صندوق رو بالا ببر ♡','mail-open')}${mailOpen?`<div class="scene-grid">${mails.map((m,i)=>`<button class="mini-choice ${openMail.has(i)?'seen':''}" data-act="mail" data-n="${i}">${art('envelope','mini-art')}<span>نامه ${i+1}</span></button>`).join('')}</div><div class="progress">${openMail.size} از ۵ نامه</div>${viewIndex!==null?note(mails[viewIndex][0],mails[viewIndex][1]):''}${openMail.size===5?note('یه نامه برای آخرِ صندوق ♡','خب پرنسس، رسیدیم به آخر صندوق پستی! 🎀\n\nاینجا چند تا حرف کوچولو گذاشتم که شاید توی یه گفت‌وگوی معمولی فرصت گفتنشون پیش نیاد.\n\nامیدوارم خوندنشون برات حس خوبی داشته باشه.\n\nو یه چیز دیگه...\n\nممنونم که برای باز کردن این نامه‌ها وقت گذاشتی. همین که اینجا هستی و داری می‌خونیشون، برای من ارزشمنده. 🌷',true):''}`:''}`);break;
case 'ticket':{const options=[['🎧','یه شب آهنگ‌بازی','هر کدوم سه تا آهنگ انتخاب کنیم و برای هم بفرستیم. بعد درباره‌شون حرف بزنیم و ببینیم سلیقه‌هامون چقدر شبیه همه! 😂'],['☕','یه گپ طولانی','یه وقت که هر دومون حوصله داشتیم، یه نوشیدنی خوشمزه برداریم و بدون عجله درباره هر چیزی که دلمون خواست حرف بزنیم.'],['🎮','یه بازی دونفره','یه بازی آنلاین بامزه پیدا کنیم و با هم بازی کنیم. البته از الان اعلام می‌کنم احتمال باخت من خیلی زیاده 😂']];html=scene('بلیت طلایی پرنسس','یه بلیت جادویی بدون تاریخ انقضا؛ انتخابش با خودته ♡',`<div class="scene-grid three">${options.map((o,i)=>`<button class="mini-choice" data-act="ticket" data-n="${i}">${art(['musicbox','cup','game'][i],'mini-art')}<span>${o[1]}</span></button>`).join('')}</div>${choice!==''?`<div class="ticket-art" id="ticketPrint"><div style="font-size:30px">🎟️ ♡</div><h3>بلیت مخصوص پرنسس</h3><h3>${options[Number(choice)][1]}</h3><p>${options[Number(choice)][2]}</p><small>هر وقت خودت دوست داشتی ♡</small></div>${note('یه بلیت بدون تاریخ انقضا','هر وقت خودت دوست داشتی و شرایطش مناسب بود، می‌تونیم ازش استفاده کنیم. هیچ عجله‌ای نیست؛ فقط دوست داشتم یه پیشنهاد قشنگ اینجا منتظرت باشه. 💗')}${btn('بلیت رو ذخیره کن ♡','ticket-save')}`:''}`);break}
case 'letter':html=scene('یه نامه که دلم می‌خواست بخونیش... ♡','این یکی با بقیه سورپرایزها فرق داره. فقط چند تا حرف از دله...',`${art('envelope','hero-art')}${btn(letterOpen?'نامه رو تا کن ♡':'نامه رو باز کن ♡','letter-open')}${letterOpen?`<article class="letter-long"><h3>برای خانوم خوشگله... 🎀💗</h3>${escapeHTML(letter)}</article><p class="toast">مرسی که برای خوندنش وقت گذاشتی، مبینا. 🌷</p>`:''}`);break;
}
body.innerHTML=html;body.scrollIntoView({block:'nearest'});}
body.addEventListener('click',async e=>{const b=e.target.closest('[data-act]');if(!b)return;const act=b.dataset.act,n=Number(b.dataset.n);switch(act){
case 'spin':{if(spinning)return;if(wheelWon.size===8)wheelWon.clear();const left=wheelGifts.map((_,i)=>i).filter(i=>!wheelWon.has(i));const index=left[Math.floor(Math.random()*left.length)];spinning=true;wheelSelected=null;const disc=document.getElementById('wheelDisc');const target=((360-(index*45))%360);const currentNorm=((spinAngle%360)+360)%360;spinAngle+=1440+((target-currentNorm+360)%360);disc.style.transform=`rotate(${spinAngle}deg)`;b.disabled=true;setTimeout(()=>{wheelWon.add(index);saveSet('wheel',wheelWon);wheelSelected=index;spinning=false;render()},3250);return}
case 'resetwheel':wheelWon.clear();wheelSelected=null;saveSet('wheel',wheelWon);break;
case 'envelope':boxOpen=!boxOpen;showSecret=false;break;
case 'envelope-secret':showSecret=!showSecret;break;
case 'flower':viewIndex=n;openFlowers.add(n);saveSet('flowers',openFlowers);break;
case 'memory':viewIndex=n;break;
case 'card':viewIndex=n;openCards.add(n);saveSet('cards',openCards);break;
case 'star':viewIndex=n;openStars.add(n);saveSet('stars',openStars);break;
case 'music-toggle':if(audio.paused){try{await audio.play()}catch{alert('پخش موسیقی در این مرورگر ممکن نشد.')}}else audio.pause();break;
case 'cake-light':cakeStage=1;showSecret=false;break;
case 'cake-blow':cakeStage=2;break;
case 'cake-gift':showSecret=!showSecret;break;
case 'cake-reset':cakeStage=0;showSecret=false;break;
case 'mail-open':mailOpen=!mailOpen;viewIndex=null;break;
case 'mail':viewIndex=n;openMail.add(n);saveSet('mail',openMail);break;
case 'ticket':choice=String(n);break;
case 'ticket-save':{const canvas=document.createElement('canvas');canvas.width=900;canvas.height=520;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff2f7';ctx.fillRect(0,0,900,520);ctx.strokeStyle='#d999b7';ctx.lineWidth=12;ctx.setLineDash([20,12]);ctx.strokeRect(30,30,840,460);ctx.textAlign='center';ctx.fillStyle='#985d83';ctx.font='bold 42px Arial';ctx.fillText('PRINCESS ♡',450,130);ctx.font='32px Arial';ctx.fillText(['MUSIC DATE','COFFEE & TALK','GAME NIGHT'][Number(choice)],450,255);ctx.font='24px Arial';ctx.fillText('Whenever you like • No expiration',450,340);ctx.font='32px Arial';ctx.fillText('♡ ♡ ♡',450,425);const a=document.createElement('a');a.download='princess-ticket.png';a.href=canvas.toDataURL('image/png');a.click();return}
case 'letter-open':letterOpen=!letterOpen;break;
}render()});
audio.addEventListener('ended',()=>{if(current==='music')render()});
