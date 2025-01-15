export class PagItemBackgroundChanger{
    static focusElementRef = null;
    static defaultBackground='rgba(0, 0, 0,0.0)'
    static focusBackground = 'rgba(247, 99, 27,0.85)';

    static setActiveBackground(ref){
        if(this.focusElementRef){
            this.focusElementRef.current.style.background=this.defaultBackground;
        }
        this.focusElementRef=ref;
        this.focusElementRef.current.style.background=this.focusBackground;
    }
}