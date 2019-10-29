const ev=eval;
const until=a=>b=>c=>a(c)(()=>c)(()=>until(a)(b)(b(c)))();
const l=a=>b=>b.includes(a)?b.slice(0,b.indexOf(a)):''; //left of a in b
const r=a=>b=>b.includes(a)?b.slice(b.indexOf(a)+a.length):''; //right of a in b
const j=a=>b=>a+b;
const inc=a=>b=>b.includes(a)?(c=>d=>c):(c=>d=>d);
const isString=a=>(typeof a)=='string'?(c=>d=>c):(c=>d=>d);

const apt=a=>b=>b(a);
const ap=a=>b=>sb(a)?'\nError: Not a function:'+a+'.\n':a(b);
const id=a=>a;
const T=a=>b=>a; //true (return first argument)
const F=a=>id; //false (return second argument)
const N=a=>a(F)(T); //not
const A=a=>a(id)(T(F)); //and
const O=a=>a(T(T))(id); //or
const iota=a=>ap(ap(a)(b=>c=>d=>ap(ap(b)(d))(ap(c)(d))))(b=>c=>b);
const compose=a=>b=>c=>b(a(c)); //compose
const till=a=>until(compose(a)(N));
const eq=a=>b=>A(inc(a)(b))(inc(b)(a)); //a equals b
const ne=a=>N(inc(a)('')); //non-empty
const bw=a=>b=>A(inc(a)(b))(eq(l(a)(b))('')); // b begins with a
const p=a=>b=>c=>c(a)(b); //pair
const t3=a=>b=>c=>p(a)(p(b)(c));
const t4=a=>b=>c=>d=>p(a)(t3(b)(c)(d));
const t13=a=>a(T);
const t23=a=>a(F)(T);
const t33=a=>a(F)(F);
const t14=a=>a(T);
const t24=a=>a(F)(T);
const t34=a=>a(F)(F)(T);
const t44=a=>a(F)(F)(F);
const NULL=T(F);
const sb=a=>(typeof a)=='string';
const ns='\nError: Not a string.\n';
//const reduce=a=>b=>c=>till(d=>d(F)(T(T(T))))(d=>p(a(d(T))(d(F)(T)))(d(F)(F)))(p(b)(c))(T); //starting at b, reduce c with function a
const reduce=a=>b=>c=>till(compose(apt(F))(apt(T(T(T)))))(d=>p(a(d(T))(d(F)(T)))(d(F)(F)))(p(b)(c))(T); //starting at b, reduce c with function a
const filterMapReverseConcat=a=>b=>reduce(c=>d=>a(d)(p(b(d))(c))(c)); //filter list2 with a, map with b, and spill into list1
const reverse=filterMapReverseConcat(T(T))(id)(NULL);
const concat=a=>b=>filterMapReverseConcat(c=>T)(id)(b)(reverse(a));
const filterMap=a=>b=>compose(reverse)(filterMapReverseConcat(a)(b)(NULL));
const map=filterMap(b=>T);
const filter=a=>filterMap(a)(id);
const joinList=reduce(j)(''); //print list of strings head to tail
const addToPairlist=a=>b=>b(c=>d=>T)(addToPairlist(p(b)(a)))(reverse(a));
const createPairList=addToPairlist(NULL); //create list from arguments(which are pairs), terminate on argument NULL
const composeList=a=>b=>reduce(c=>d=>d(c))(b)(a); //compose functions from a list
const color=a=>b=>p(b(T))(p(b(F))('<span style=\'color:'+a+'\'>'+b(T)+'</span>'));
const red='#ff0000',green='#c0e020',blue='#20c0e0',brown='#e0c020',light='#c0c0c0',dark='#808080',white='#ffffff';
const lambdize=y=>map(a=>p(a(T))(p((o=>f=>x=>p(b=>ap(o)(ap(f)(b))(y)(T))(x))(a(F)(T)))(a(F)(F))))(y);
const wrap=a=>x=>p(color(light)(p('\\')(g=>y=>p(g)(x))))(q(color(blue)(p(a)(g=>y=>p(b=>ap(g)(b))(y))))(lambdize(x)));
const replace=a=>b=>c=>map(d=>eq(d(T))(a)(b)(d))(c); //replace pairs in c that have first element as a, with b
const q=a=>b=>filter(c=>eq(c(T))(a(T)))(b)(c=>d=>T)(replace(a(T))(a)(b))(p(a)(b));
const functions=createPairList
	(color(brown)(p('\'')(f=>x=>p('')(q(color(brown)(p('')(r=>g=>y=>p(r)(y))))(q(color(brown)(p('\'')(g=>y=>p(ap(f)(g))((x)))))(NULL))))))
	(color(green)(p('+')(f=>x=>p(sb(f)?(a=>sb(a)?f+a:ns):ns)(x))))
	(color(blue)(p('i')(f=>x=>p(ap(f)(iota))(x))))
	(color(light)(p('(')(f=>x=>p(id)(replace(')')(color(light)(p(')')(g=>y=>p(ap(f)(g))(x))))(x)))))
	(color(dark)(p('/*')(f=>x=>p(id)(q(color(dark)(p('')(r=>g=>y=>p(f)(y))))(q(color(dark)(p('*/')(g=>y=>p(f)(x))))(NULL))))))
	(color(dark)(p('//')(f=>x=>p(id)(q(color(dark)(p('')(r=>g=>y=>p(f)(y))))(q(color(dark)(p('\n')(g=>y=>p(f)(x))))(NULL))))))
	(color(light)(p('[')(f=>x=>p('')(q(color(brown)(p('')(r=>g=>y=>p(r)(y))))(q(color(light)(p('=')(g=>y=>p(id)(q(color(light)(p(']')(h=>z=>p(f)(q(color(blue)(p(g)(i=>a=>p(i(h))(a))))(x)))))(x)))))(NULL))))))
	(color(light)(p('\\')(f=>x=>p('')(q(color(blue(p('')(r=>g=>y=>p(r)(y))))(q(color(light)(p('.')(g=>y=>p(id)(wrap(g)(x)))))(NULL))))))
	(color(light)(p('[')(f=>x=>p('')(q(color(brown)(p('')(r=>g=>y=>p(r)(y))))(q(color(light)(p('=')(g=>y=>p(id)())))(NULL))))))
	(color(red)(p('')(r=>p)))
	(color(red)(p(')')(p)))
	(color(white)(p(' ')(p)))
	(color(white)(p('\t')(p)))
	(color(white)(p('\n')(p)))
	(NULL);
const first=a=>b=>(m=>ne(m)(bw(m)(b)(m)(l(m)(b)))(b))(reduce(c=>d=>A(inc(d)(b))(ne(d))(inc(l(d)(b))(c(T))(inc(c(T))(l(d)(b))(inc(d)(c(F))(c)(p(l(d)(b))(d)))(p(l(d)(b))(d)))(c))(c))(p(b)(''))(a)(F)); //search for non-empty strings from list a in b, get first match, largest in case of tie, return match if b begins with it, else left of match
console.log(first(functions)('pq'));
const find=a=>b=>(c=>c(d=>e=>T)(c(T))(c))(filter(c=>eq(a)(c(T)))(b)); //find pair having first element as a, in list b
const parse=m=>f=>x=>s=>
	till(a=>ne(a(F)(F)(F)))
	(a=>(m=>f=>x=>s=>(n=>
			(t4 (j(m)(n(F)(F))) ((n(F)(T))(f)(x)(T)) ((n(F)(T))(f)(x)(F)) (ne(n(T))(r(n(T))(s))('')))
		)((r=>(find(r)(x))(b=>c=>T)(find(r)(x))(p(r)(p(find('')(x)(F)(T)(r))(find('')(x)(F)(F).replace('><','>'+r+'<')))))(first(map(b=>b(T))(x))(s))))
		(t14(a))(t24(a))(t34(a))(t44(a)))
	(t4(m)(f)(x)(s));
console.log(joinList(map(b=>b(T))(functions)));
console.log(first(map(b=>b(T))(functions))('dfjkg'));
console.log(parse('')(id)(functions)('cctba')(T));
console.log(first(map(a=>a(T))(functions))('(abprcd'));