var Broadcast=(function(){
    var carouseStyle={
        overflow: "hidden",
        position:"relative" ,
        margin: "auto",
        backgroundColor: "antiquewhite"
    };
    var imgConStyle={
        position:"absolute",
    };
    var bnStyle={
        position:"absolute",
    };
    var listyle={
        width:"17px",
        height:"17px",
        borderRadius:"17px",
        background:"rgba(255,0,0,0)",
        float:"left",
        border:"1px solid #ff0000",
        margin:"5px"
    };
    var ulstyle={
        margin:"0px",
        padding:"0px",
        position:"absolute",
        bottom:"5px",
        listStyle:"none"
    }
    function Broadcast(parent,imgList,bnList){
        this.init(parent,bnList)
        this.source=imgList
    }
    Broadcast.prototype={
        imgList:[],
        carouse:null,
        _width:0,
        _height:0,
        _source:[],
        direction:"",
        position:0,
        bool:false,
        autoBool:false,
        time:180,
        set source(value){
                if(value.length===0)return;
                if(!value)return;
                if(!Array.isArray(value))return;
                this.width=0;
                this.height=0;
                if(this.imgList.length>0){
                    console.log("a")
                    this.imgList[this.imgList.length-1].removeEventListener("load",this.imgLoadHandler)
                }
                this.imgList.length=0;
                this._source=value;
                this.imgLoad(value);
        },
        get source(){
            return this._source
        },
        imgLoad:function(List){
            var img=new Image();
            img.addEventListener("load",this.loadImageHandler);
            img.imgList=[];
            img.arr=List
            img.num=0;
            img.self=this;
            img.src=List[img.num];
        },
        loadImageHandler:function(e){
            this.imgList.push(this.cloneNode(false));
            this.num++;
            if(this.num>this.arr.length-1){
                this.self.imgLoadFinishHandler(this.imgList);
                return
            }
            this.src=this.arr[this.num]

        },
        set width (value){
            this._width=value
            if(this.imgList.length==0)return
            this.carouse.style.width=value+"px";
            this.carouse.lastElementChild.style.left=(value-this.carouse.lastElementChild.offsetWidth)/2+"px";

        },
        get width(){
            return this._width
        },
        set height (value){
            this._height=value
            if(this.imgList.length==0)return
            this.carouse.style.height=value+"px";
            this.carouse.firstChild.style.height=value+"px";
            this.carouse.children[2].style.top=this.carouse.children[1].style.top=(value- this.carouse.children[1].offsetWidth)/2+"px";
        },
        get height(){
          return this._height
        },
        //加载完图片才会创建LI
        imgLoadFinishHandler:function(imgList){
            this.imgList=imgList
            var imgCon=this.carouse.firstElementChild
            var ul=this.carouse.lastElementChild
            this.createCon(imgCon)
            this.createCon(ul)
            imgCon.appendChild(this.imgList[0]);
            for(var i=0;i<this.imgList.length;i++){
                var li=document.createElement("li");
                Object.assign(li.style,listyle)
                ul.appendChild(li);
            }
            this.liColor();
            if(this.width===0){
                this.width=this.imgList[0].offsetWidth
               // this.setWidth(this.imgList,this.width)
            }else{
                this.carouse.style.width=this.width+"px";
                this.setWidth(this.imgList,this.width)
            }
            if(this.height===0){
                this.height=this.imgList[0].offsetHeight
            }else{
                this.carouse.style.height=this.height+"px";
                this.carouse.firstElementChild.style.height=this.height+"px";
                this.setWidth(this.imgList,null,this.height)
            }
            this.carouse.children[1].style.top=this.carouse.children[2].style.top=(this.height-this.carouse.children[1].offsetWidth)/2+"px";
            ul.style.left=(this.width-ul.offsetWidth)/2+"px";
        },
        setWidth:function(Con,w,h){
            var len=Con.length
            if(w){
                    for(var i=0;i<len;i++){
                        Con[i].style.width=w+"px";
                    }
            }
            if(h){
                for(var i=0;i<len;i++){
                    Con[i].style.height=h+"px";
                }
            }
          },
        createCon:function(CON){
            var len=CON.children.length;
            for(var i=0;i<len;i++){
                CON.firstElementChild.remove();
            }
        },
        init:function(parent,bnList){
            this.carouse=document.createElement("div");
            this.carouse.self=this;
            this.carouse.addEventListener("mouseenter",this.carouseMouserHandler)
            this.carouse.addEventListener("mouseleave",this.carouseMouserHandler)
            Object.assign(this.carouse.style,carouseStyle);
            parent.appendChild(this.carouse);
            var imgCon=document.createElement("div");
            Object.assign(imgCon.style,imgConStyle)
            this.carouse.appendChild(imgCon);
            for(var i=0;i<bnList.length;i++){
                    var bnimg=new Image();
                    bnimg.src=bnList[i];
                    bnimg.addEventListener("load",this.bnLoadHandler);
                    bnimg.addEventListener("click",this.bnClickHandler);
                    bnimg.self=this;
                    Object.assign(bnimg.style,bnStyle);
                    this.carouse.appendChild(bnimg);
                    if(i===1){
                        bnimg.style.right="5px";
                    }else{
                        bnimg.style.left="5px";
                    }
            }
            var ul=document.createElement("ul");
            ul.addEventListener("click",this.ulClickHandler);
            Object.assign(ul.style,ulstyle);
            ul.self=this
            this.carouse.appendChild(ul);
        },
        bnLoadHandler:function(e){
        this.self.carouse.children[1].style.top=this.self.carouse.children[2].style.top=(this.self.height-this.offsetWidth)/2+"px";
        },
        bnClickHandler:function(e){
            if(this.self.bool)return
            if(this.offsetLeft<300){
                this.self.direction="right";
                this.self.position--
                if(this.self.position<0){
                    this.self.position=4
                }
            }else if(this.offsetLeft>300){
                this.self.direction="left";
                this.self.position++
                if(this.self.position>4){
                    this.self.position=0
                }
            }
            this.self.nextImg();
            this.self.liColor();
        },
        ulClickHandler:function(e){
            if(this.self.bool)return
            if(e.target instanceof HTMLUListElement)return
            var arr=Array.from(this.children);
            var index=arr.indexOf(e.target)
            if(index===this.self.position)return
            if(index>this.self.position){
                this.self.direction="left";
            }else if(index<this.self.position){
                this.self.direction="right";
            }
            this.self.position=index
             this.self.nextImg();
            this.self.liColor();
        },
        nextImg:function(){
            if(this.direction==="right"){
                this.carouse.firstChild.insertBefore(this.imgList[this.position],this.carouse.firstChild.firstChild);
                this.carouse.firstChild.style.width=this.width*2+"px";
                this.carouse.firstChild.style.left=-this.width+"px";
            }else if(this.direction==="left"){
                this.carouse.firstChild.appendChild(this.imgList[this.position])
                this.carouse.firstChild.style.width=this.width*2+"px";
                this.carouse.firstChild.style.left="0px";
            }
            this.bool=true
        },
        clearNextImg:function(){
            if(!this.bool)return
            if(this.direction==="right"){
                this.carouse.firstChild.style.left=this.carouse.firstChild.offsetLeft+20+"px";
                if(this.carouse.firstChild.offsetLeft>=0){
                    this.carouse.firstChild.lastElementChild.remove();
                    this.carouse.firstChild.style.left="0px";
                    this.direction="";
                    this.bool=false;
                    return
                }
            }else if(this.direction==="left"){
                this.carouse.firstChild.style.left=this.carouse.firstChild.offsetLeft-20+"px";
                if(this.carouse.firstChild.offsetLeft<=-this.width){
                    this.carouse.firstChild.firstElementChild.remove();
                    this.carouse.firstChild.style.left="0px";
                    this.direction="";
                    this.bool=false;
                    return
                }
            }
        },
        update:function(){
            this.clearNextImg();
            this.autoPlay();
        },
        liColor:function(){
            var arr=Array.from(this.carouse.lastElementChild.children);
            for(var i=0;i<arr.length;i++){
                arr[i].style.background="rgba(255,0,0,0)";
            }
            arr[this.position].style.background="rgba(255,0,0,0.6)";
        },
        autoPlay:function(){
            if(this.bool)return
            if(!this.autoBool)return;
            this.time--;
            if(this.time>0)return;
            this.direction="left";
            this.position++;
            if(this.position>4)this.position=0
            this.time=180;
            this.nextImg();
            this.liColor();
        },
        carouseMouserHandler:function(e){
            if(e.type==="mouseenter"){
                this.self.autoBool=true;
            }else if(e.type==="mouseleave"){
                this.self.autoBool=false;
            }
        }
    }
    Broadcast.prototype.constructor=Broadcast
    return Broadcast
})();
