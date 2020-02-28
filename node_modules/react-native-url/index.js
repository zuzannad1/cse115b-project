
export default class URL {

  constructor(url) {
    if (url instanceof URL) {
      this.__s = {... url.__s };;
    }else{
      url = url || '';
      this.__s = parse(url);  
    }
  }

  get domain() { return this.__s.domain; }
  set domain(domain) { this.__s.domain = domain; }

  get hash() { return this.__s.hash; }
  set hash(hash) { this.__s.hash = hash; }

  get hostname() { return this.__s.hostname; }
  set hostname(hostname) { this.__s.hostname = hostname; }

  get auth() { return this.__s.auth; }
  set auth(auth) { this.__s.auth = auth; }

  get user() { return this.__s.user; }
  set user(user) {
    if (user === undefined) {
      delete this.__s.user;
      delete this.__.pass;
      delete this.__s.auth;
      return;
    }
    this.__s.user = user; this.__s.replace(/^[^:]+/, user)
  }

  get pass() { return this.__s.pass; }
  set pass(pass) {
    if (this.__s.user === undefined || this.__.user === null) {
      throw new Error('forbid to set pass whitout user.');
    }
    pass = pass || '';
    this.__s.pass = pass;
    this.__s.auth.replace(/[^:]+$/, pass);
  }

  get path() { return this.__s.path; }
  set path(path) { this.__s.path = path; }

  get port() { return this.__s.port; }
  set port(port) { this.__s.port = port; }

  get protocol() { return this.__s.protocol; }
  set protocol(protocol) { this.__s.protocol = protocol; }

  get query() { return this.__s.query; }
  set query(query) { this.__s.query = query; }

  get sub() { return this.__s.sub; }
  set sub(sub) { this.__s.sub = sub; }

  get tld() { return this.__s.tld; }
  set tld(tld) { this.__s.tld = tld; }

  toString() {
    var tmp = this.__s || {};
    return [
      tmp.protocol ? `${tmp.protocol}://` : '',
      tmp.auth ? `${tmp.auth}@` : '',
      tmp.hostname ? tmp.hostname : '',
      tmp.port ? `:${tmp.port}` : '',
      tmp.path ? tmp.path : '',
      tmp.query ? `?${tmp.query}` : '',
      tmp.hash ? `#${tmp.hash}` : ''
    ].join('');
  }
}

const HashbangsRegex = /(.*?)\/#\!(.*)/; 
const HashRegex = /(.*?)#(.*)/;
const QueryRegex = /(.*?)\?(.*)/;
const ProtocolRegex = /(.*?)\:?\/\/(.*)/;
const PathRegex = /(.*?)(\/.*)/;
const FileRegex = /(.*?)\.(.*)/;
const PortRegex = /(.*)\:([0-9]+)$/;
const AuthRegex = /(.*?)@(.*)/;
const TLDRegex = new RegExp(/(.*?)\.?([^\.]*?)\.?(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/);

function parse(url) {
  if (!url) return {};

  var proto = {}, tmp, tmp2;
  
  // Ignore Hashbangs.
  if (tmp = url.match(HashbangsRegex)) {
      url = tmp[1] + tmp[2];
  }

  // Hash.
  if (tmp = url.match(HashRegex)) {
      proto.hash = tmp[2];
      url = tmp[1];
  }

  // Query
  if (tmp = url.match(QueryRegex)) {
      proto.query = tmp[2];
      url = tmp[1];
  }

  // Protocol.
  if (tmp = url.match(ProtocolRegex)) {
      proto.protocol = tmp[1].toLowerCase();
      url = tmp[2];
  }

  // Path.
  if (tmp = url.match(PathRegex)) {
      proto.path = tmp[2];
      url = tmp[1];
  }

  // Clean up path.
  proto.path = (proto.path || '').replace(/^([^\/])/, '/$1').replace(/\/$/, '');

  // File.
  tmp = slot('/-1', proto.path.substring(1));

  if (tmp && (tmp = tmp.match(FileRegex))) {
      proto.file = tmp[0];
      proto.filename = tmp[1];
      proto.fileext = tmp[2];
  }

  // Port.
  if (tmp = url.match(PortRegex)) {
      proto.port = tmp[2];
      url = tmp[1];
  }

  // Auth.
  if (tmp = url.match(AuthRegex)) {
      proto.auth = tmp[1];
      url = tmp[2];
  }

  // User and pass.
  if (proto.auth) {
      tmp = proto.auth.match(/(.*)\:(.*)/);

      proto.user = tmp ? tmp[1] : proto.auth;
      proto.pass = tmp ? tmp[2] : undefined;
  }

  // Hostname.
  proto.hostname = url.toLowerCase();

  // Domain, tld and sub domain.
  if (tmp = proto.hostname.match(TLDRegex)) {
    proto.tld = tmp[3];
    proto.domain = tmp[2] ? tmp[2] + '.' + tmp[3] : undefined;
    proto.sub = tmp[1] || undefined;
  }

  return proto;
}

function slot(arg, str) {
  var sptr = arg.charAt(0),
      split = str.split(sptr);

  if (sptr === arg) { return split; }

  arg = parseInt(arg.substring(1), 10);

  return split[arg < 0 ? split.length + arg : arg - 1];
}