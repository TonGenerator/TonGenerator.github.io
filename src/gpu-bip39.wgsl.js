/*
 * SHA-512 constants checked against @noble/hashes 1.8.0 (sha2.js).
 * Copyright (c) 2022 Paul Miller (https://paulmillr.com)
 * MIT License: Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to
 * whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * The WGSL below is an independent implementation of FIPS 180-4, RFC 8018,
 * and BIP39; it contains no third-party website application code.
 */
const ROUND_CONSTANTS = [
  '428a2f98d728ae22', '7137449123ef65cd', 'b5c0fbcfec4d3b2f', 'e9b5dba58189dbbc',
  '3956c25bf348b538', '59f111f1b605d019', '923f82a4af194f9b', 'ab1c5ed5da6d8118',
  'd807aa98a3030242', '12835b0145706fbe', '243185be4ee4b28c', '550c7dc3d5ffb4e2',
  '72be5d74f27b896f', '80deb1fe3b1696b1', '9bdc06a725c71235', 'c19bf174cf692694',
  'e49b69c19ef14ad2', 'efbe4786384f25e3', '0fc19dc68b8cd5b5', '240ca1cc77ac9c65',
  '2de92c6f592b0275', '4a7484aa6ea6e483', '5cb0a9dcbd41fbd4', '76f988da831153b5',
  '983e5152ee66dfab', 'a831c66d2db43210', 'b00327c898fb213f', 'bf597fc7beef0ee4',
  'c6e00bf33da88fc2', 'd5a79147930aa725', '06ca6351e003826f', '142929670a0e6e70',
  '27b70a8546d22ffc', '2e1b21385c26c926', '4d2c6dfc5ac42aed', '53380d139d95b3df',
  '650a73548baf63de', '766a0abb3c77b2a8', '81c2c92e47edaee6', '92722c851482353b',
  'a2bfe8a14cf10364', 'a81a664bbc423001', 'c24b8b70d0f89791', 'c76c51a30654be30',
  'd192e819d6ef5218', 'd69906245565a910', 'f40e35855771202a', '106aa07032bbd1b8',
  '19a4c116b8d2d0c8', '1e376c085141ab53', '2748774cdf8eeb99', '34b0bcb5e19b48a8',
  '391c0cb3c5c95a63', '4ed8aa4ae3418acb', '5b9cca4f7763e373', '682e6ff3d6b2b8a3',
  '748f82ee5defb2fc', '78a5636f43172f60', '84c87814a1f0ab72', '8cc702081a6439ec',
  '90befffa23631e28', 'a4506cebde82bde9', 'bef9a3f7b2c67915', 'c67178f2e372532b',
  'ca273eceea26619c', 'd186b8c721c0c207', 'eada7dd6cde0eb1e', 'f57d4f7fee6ed178',
  '06f067aa72176fba', '0a637dc5a2c898a6', '113f9804bef90dae', '1b710b35131c471b',
  '28db77f523047d84', '32caab7b40c72493', '3c9ebe0a15c9bebc', '431d67c49c100d4c',
  '4cc5d4becb3e42b6', '597f299cfc657e2a', '5fcb6fab3ad6faec', '6c44198c4a475817',
];
export function gpuSha512Constants() {
  return new Uint32Array(ROUND_CONSTANTS.flatMap(value => [Number.parseInt(value.slice(0,8),16),Number.parseInt(value.slice(8),16)]));
}

// Compact, deliberately rolled kernels. The SHA-512 and PBKDF2 loop bounds
// come from uniforms, preventing compiler expansion of nested crypto rounds.
// BIP39 and SLIP-0010 share the SHA-512 kernels. Ed25519 stays in CPU WASM.
export function makeGpuBip39Shader({ workgroupSize = 32 } = {}) {
  if (![32, 64].includes(workgroupSize)) throw new Error('Unsupported GPU workgroup size');
  // Named schedule registers avoid dynamically indexed private memory.
  // Four rounds per group keep driver compilation bounded and prevent an
  // 80-round x 2048-iteration compiler expansion.
  const scheduleRegisters=Array.from({length:16},(_,i)=>`var w${i}=block[${i}];`).join('\n  ');
  const roundGroup=Array.from({length:4},(_,i)=>`{
    if(roundBase+${i}u>=roundCount){break;}
    if(roundBase>=16u){w${i}=plus4(small1(w${(i+14)%16}),w${(i+9)%16},small0(w${(i+1)%16}),w${i});}
    let t1=plus5(h,large1(e),g^(e&(f^g)),ROUND_KEYS[roundBase+${i}u],w${i});
    let t2=plus(large0(a),(a&b)|(c&(a|b)));
    h=g;g=f;f=e;e=plus(d,t1);d=c;c=b;b=a;a=plus(t1,t2);
  }`).join('\n  ');
  const rotateSchedule=`let old0=w0;let old1=w1;let old2=w2;let old3=w3;\n`
    +Array.from({length:12},(_,i)=>`w${i}=w${i+4};`).join('')
    +'w12=old0;w13=old1;w14=old2;w15=old3;';
  const macMessage=Array.from({length:8},(_,i)=>`message[${i}]`)
    .concat(['U64(0x80000000u,0u)',...Array(6).fill('U64(0u)'), 'U64(0u,1536u)']).join(',');
  const paddedKey=Array.from({length:16},(_,i)=>`key[${i}]^U64(mask)`).join(',');
  const accumulate=Array.from({length:8},(_,i)=>`accumulated[${i}]^=current[${i}];`).join('\n    ');
  return `
alias U64 = vec2<u32>;
alias Digest = array<U64,8>;
alias Block = array<U64,16>;
struct PbkdfState {
  inner: Digest,
  outer: Digest,
  current: Digest,
  accumulated: Digest,
}
struct Parameters {
  count: u32,
  rounds: u32,
  shaRounds: u32,
  pad: u32,
}
@group(0) @binding(0) var<storage,read> passwords: array<u32>;
@group(0) @binding(1) var<storage,read_write> states: array<PbkdfState>;
@group(0) @binding(2) var<storage,read_write> results: array<u32>;
@group(0) @binding(3) var<uniform> parameters: Parameters;
@group(0) @binding(4) var<storage,read> ROUND_KEYS: array<U64>;
const INITIAL: Digest = Digest(
  U64(0x6a09e667u,0xf3bcc908u), U64(0xbb67ae85u,0x84caa73bu),
  U64(0x3c6ef372u,0xfe94f82bu), U64(0xa54ff53au,0x5f1d36f1u),
  U64(0x510e527fu,0xade682d1u), U64(0x9b05688cu,0x2b3e6c1fu),
  U64(0x1f83d9abu,0xfb41bd6bu), U64(0x5be0cd19u,0x137e2179u)
);
// Shared read-only constants avoid a separate addressable 640-byte table
// for every GPU invocation. Each warp reads the same cached round key.

// All array accesses are additionally limited to the actual bound buffers.
// The host sets shaRounds to 80 and verifies the resulting public fixture.
// Keep only a bounded range guard here: testing equality to 80 would let some
// compilers propagate that fact and specialize the supposedly runtime loop.
fn candidateActive(index: u32) -> bool {
  let capacity = min(arrayLength(&states),
    min(arrayLength(&passwords)/32u,arrayLength(&results)/16u));
  return parameters.shaRounds > 0u && parameters.shaRounds <= 80u
    && index < min(parameters.count,capacity);
}
fn plus(x: U64, y: U64) -> U64 {
  let low = x.y+y.y;
  return U64(x.x+y.x+select(0u,1u,low<x.y),low);
}
fn plus4(a: U64, b: U64, c: U64, d: U64) -> U64 {
  return plus(plus(a,b),plus(c,d));
}
fn plus5(a: U64, b: U64, c: U64, d: U64, e: U64) -> U64 {
  return plus(plus4(a,b,c,d),e);
}
fn rotate(x: U64, count: u32) -> U64 {
  if(count<32u) { return (x>>U64(count))|(x.yx<<U64(32u-count)); }
  let n=count-32u;
  return (x.yx>>U64(n))|(x<<U64(32u-n));
}
fn small0(x: U64) -> U64 {
  return rotate(x,1u)^rotate(x,8u)^U64(x.x>>7u,(x.y>>7u)|(x.x<<25u));
}
fn small1(x: U64) -> U64 {
  return rotate(x,19u)^rotate(x,61u)^U64(x.x>>6u,(x.y>>6u)|(x.x<<26u));
}
fn large0(x: U64) -> U64 { return rotate(x,28u)^rotate(x,34u)^rotate(x,39u); }
fn large1(x: U64) -> U64 { return rotate(x,14u)^rotate(x,18u)^rotate(x,41u); }

fn compress(base: Digest, block: Block) -> Digest {
  ${scheduleRegisters}
  var a=base[0]; var b=base[1]; var c=base[2]; var d=base[3];
  var e=base[4]; var f=base[5]; var g=base[6]; var h=base[7];
  let roundCount=min(parameters.shaRounds,80u);
  for(var roundBase=0u;roundBase<roundCount;roundBase+=4u) {
    ${roundGroup}
    ${rotateSchedule}
  }
  return Digest(plus(base[0],a),plus(base[1],b),plus(base[2],c),plus(base[3],d),
    plus(base[4],e),plus(base[5],f),plus(base[6],g),plus(base[7],h));
}
fn finish64(base: Digest, message: Digest) -> Digest {
  return compress(base,Block(${macMessage}));
}
fn mac64(inner: Digest, outer: Digest, message: Digest) -> Digest {
  return finish64(outer,finish64(inner,message));
}
fn padState(key: Block, mask: u32) -> Digest {
  return compress(INITIAL,Block(${paddedKey}));
}

@compute @workgroup_size(${workgroupSize})
fn initialize(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index=gid.x;
  if(!candidateActive(index)) { return; }
  var key: Block;
  let blockWords=min(parameters.shaRounds/5u,16u);
  for(var j=0u;j<blockWords;j++) {
    let offset=index*32u+j*2u;
    key[j]=U64(passwords[offset],passwords[offset+1u]);
  }
  let inner=padState(key,0x36363636u);
  let outer=padState(key,0x5c5c5c5cu);
  // U1 = HMAC-SHA512(mnemonic, UTF8("mnemonic") || INT32_BE(1)).
  var first: Block;
  first[0]=U64(0x6d6e656du,0x6f6e6963u);
  first[1]=U64(1u,0x80000000u);
  first[15]=U64(0u,1120u);
  let u1=finish64(outer,compress(inner,first));
  states[index]=PbkdfState(inner,outer,u1,u1);
}

@compute @workgroup_size(${workgroupSize})
fn iterate(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index=gid.x;
  if(!candidateActive(index) || parameters.rounds<1u || parameters.rounds>256u) { return; }
  let inner=states[index].inner;
  let outer=states[index].outer;
  var current=states[index].current;
  var accumulated=states[index].accumulated;
  let iterationCount=min(parameters.rounds,256u);
  // Host dispatches exactly 2047 additional iterations after initialize.
  // Uniform bounds keep this deliberately small and never statically unrolled.
  for(var round=0u;round<iterationCount;round++) {
    current=mac64(inner,outer,current);
    ${accumulate}
  }
  states[index].current=current;
  states[index].accumulated=accumulated;
}

fn swap(x: u32) -> u32 {
  return ((x&255u)<<24u)|((x&65280u)<<8u)|((x>>8u)&65280u)|(x>>24u);
}
fn slipChild(node: Digest, childIndex: u32) -> Digest {
  var chainKey: Block;
  chainKey[0]=node[4]; chainKey[1]=node[5]; chainKey[2]=node[6]; chainKey[3]=node[7];
  let inner=padState(chainKey,0x36363636u);
  let outer=padState(chainKey,0x5c5c5c5cu);
  // 0x00 || parent key (32 bytes) || hardened index (4 bytes), then padding.
  var message: Block;
  message[0]=U64(node[0].x>>8u,(node[0].x<<24u)|(node[0].y>>8u));
  message[1]=U64((node[0].y<<24u)|(node[1].x>>8u),(node[1].x<<24u)|(node[1].y>>8u));
  message[2]=U64((node[1].y<<24u)|(node[2].x>>8u),(node[2].x<<24u)|(node[2].y>>8u));
  message[3]=U64((node[2].y<<24u)|(node[3].x>>8u),(node[3].x<<24u)|(node[3].y>>8u));
  message[4]=U64((node[3].y<<24u)|(childIndex>>8u),(childIndex<<24u)|0x00800000u);
  message[15]=U64(0u,1320u);
  return finish64(outer,compress(inner,message));
}
@compute @workgroup_size(${workgroupSize})
fn completeSeed(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index=gid.x;
  if(!candidateActive(index)) { return; }
  var rootKey: Block;
  rootKey[0]=U64(0x65643235u,0x35313920u);
  rootKey[1]=U64(0x73656564u,0u);
  var node=mac64(padState(rootKey,0x36363636u),padState(rootKey,0x5c5c5c5cu),states[index].accumulated);
  // Standard m/44'/607'/0'. Runtime loop bounds prevent nested expansion.
  let children=min(parameters.shaRounds/20u,3u);
  for(var child=0u;child<children;child++) {
    let childIndex=select(select(0x80000000u,0x8000025fu,child==1u),0x8000002cu,child==0u);
    node=slipChild(node,childIndex);
  }
  let keyWords=min(parameters.shaRounds/20u,4u);
  for(var j=0u;j<keyWords;j++) {
    results[index*16u+j*2u]=swap(node[j].x);
    results[index*16u+j*2u+1u]=swap(node[j].y);
  }
}
@compute @workgroup_size(${workgroupSize})
fn complete(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index=gid.x;
  if(!candidateActive(index)) { return; }
  var root=states[index].accumulated;
  let digestWords=min(parameters.shaRounds/10u,8u);
  for(var j=0u;j<digestWords;j++) {
    // Storage u32 are little-endian; swap so readback bytes are canonical BE.
    results[index*16u+j*2u]=swap(root[j].x);
    results[index*16u+j*2u+1u]=swap(root[j].y);
  }
}
`;
}
