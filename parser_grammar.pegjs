PROGRAM = a:SCENE+ {return a;}

SCENE = _ "<scene>" _ a:DECL* _ "<onload>" _ b:SETATTRS* _ "</onload>" _ "<play>" _ c:ACTION* _ "</play>" _ "</scene>" _ {
    return {
        declarations: a.reduce((x,c)=>Object.assign(x, c)),
        attributes: b,
        actions: c
    };
}

DECL
= _ "base" _ "->" _ l:literal _ ";" _  {return {base: {url: l}};}
/ _ "objects" _ ":" _ "{" _ a:(b:literal _ ":" _ c:id _ ","? _ {let x = {}; x[c]=b; return x;})+ _ "}" _ ";" _ {return {objects: a}}

SETATTRS = _ a:id _ "->" _ d:(b:attr _ ":" _ c:val _ ","? _ {let x = {}; x[b]=c; return x;})+ _ ";" _ {return {actor: a, attributes:d.reduce((x,c)=>Object.assign(x, c)) };}

ACTION
= _ "subtitle" _ ":" _ r:literal _ ";" _ {return {subtitle: r};}
/ _ a:id _ "(" _ b:action _ d:("," _ c:(literal/val/(m:id "." n:attr {let x = {}; x[m]=n; return x;})) {return c;})* _ ")" _ ";" _ {return {action:b, actor: a, parameters: d };}

_ = [ \n\t\r]* 

literal 
= '"' r:[^\"]+ '"' {return r.reduce((a,c)=> a+c);} 
/ r:[0-9]+ {return parseInt(r.reduce((a,c)=> a+c))}
id = r:[a-zA-Z0-9]+ {return r.reduce((a,c)=> a+c);}
attr = r:("position" / "size") {return r;}
val = r:("rightend"/ "leftend"/ "middle"/ "slow"/ "fast"/ "medium"/ "default"/ "large"/ "small") {return r;} 
action = r:("move"/ "dialog") {return r;}
