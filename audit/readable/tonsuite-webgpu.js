import { t as e } from "./vanity.worker-CItyiGg3.js";
var t = `// Genuine BIP39 PBKDF2-HMAC-SHA512 (c = 2048, dkLen = 64).
// One invocation derives one seed. SHA-512's u64 words are represented as
// vec2<u32>(high, low), because portable WGSL has no concrete u64 type.

const WORKGROUP_SIZE: u32 = 64u;
const MNEMONIC_STRIDE_WORDS: u32 = 32u; // 128 UTF-8 bytes
const PBKDF2_ITERATIONS: u32 = 2048u;
const TON_BASIC_ITERATIONS: u32 = 390u;
const TON_DEFAULT_ITERATIONS: u32 = 100000u;

struct Params {
  count: u32,
  _padding0: u32,
  _padding1: u32,
  _padding2: u32,
}

@group(0) @binding(0) var<storage, read> mnemonic_words: array<u32>;
@group(0) @binding(1) var<storage, read_write> derived_seeds: array<u32>;
@group(0) @binding(2) var<uniform> params: Params;

const SHA512_IV: array<vec2<u32>, 8> = array<vec2<u32>, 8>(
  vec2<u32>(0x6a09e667u, 0xf3bcc908u),
  vec2<u32>(0xbb67ae85u, 0x84caa73bu),
  vec2<u32>(0x3c6ef372u, 0xfe94f82bu),
  vec2<u32>(0xa54ff53au, 0x5f1d36f1u),
  vec2<u32>(0x510e527fu, 0xade682d1u),
  vec2<u32>(0x9b05688cu, 0x2b3e6c1fu),
  vec2<u32>(0x1f83d9abu, 0xfb41bd6bu),
  vec2<u32>(0x5be0cd19u, 0x137e2179u),
);

const SHA512_K: array<vec2<u32>, 80> = array<vec2<u32>, 80>(
  vec2<u32>(0x428a2f98u, 0xd728ae22u), vec2<u32>(0x71374491u, 0x23ef65cdu),
  vec2<u32>(0xb5c0fbcfu, 0xec4d3b2fu), vec2<u32>(0xe9b5dba5u, 0x8189dbbcu),
  vec2<u32>(0x3956c25bu, 0xf348b538u), vec2<u32>(0x59f111f1u, 0xb605d019u),
  vec2<u32>(0x923f82a4u, 0xaf194f9bu), vec2<u32>(0xab1c5ed5u, 0xda6d8118u),
  vec2<u32>(0xd807aa98u, 0xa3030242u), vec2<u32>(0x12835b01u, 0x45706fbeu),
  vec2<u32>(0x243185beu, 0x4ee4b28cu), vec2<u32>(0x550c7dc3u, 0xd5ffb4e2u),
  vec2<u32>(0x72be5d74u, 0xf27b896fu), vec2<u32>(0x80deb1feu, 0x3b1696b1u),
  vec2<u32>(0x9bdc06a7u, 0x25c71235u), vec2<u32>(0xc19bf174u, 0xcf692694u),
  vec2<u32>(0xe49b69c1u, 0x9ef14ad2u), vec2<u32>(0xefbe4786u, 0x384f25e3u),
  vec2<u32>(0x0fc19dc6u, 0x8b8cd5b5u), vec2<u32>(0x240ca1ccu, 0x77ac9c65u),
  vec2<u32>(0x2de92c6fu, 0x592b0275u), vec2<u32>(0x4a7484aau, 0x6ea6e483u),
  vec2<u32>(0x5cb0a9dcu, 0xbd41fbd4u), vec2<u32>(0x76f988dau, 0x831153b5u),
  vec2<u32>(0x983e5152u, 0xee66dfabu), vec2<u32>(0xa831c66du, 0x2db43210u),
  vec2<u32>(0xb00327c8u, 0x98fb213fu), vec2<u32>(0xbf597fc7u, 0xbeef0ee4u),
  vec2<u32>(0xc6e00bf3u, 0x3da88fc2u), vec2<u32>(0xd5a79147u, 0x930aa725u),
  vec2<u32>(0x06ca6351u, 0xe003826fu), vec2<u32>(0x14292967u, 0x0a0e6e70u),
  vec2<u32>(0x27b70a85u, 0x46d22ffcu), vec2<u32>(0x2e1b2138u, 0x5c26c926u),
  vec2<u32>(0x4d2c6dfcu, 0x5ac42aedu), vec2<u32>(0x53380d13u, 0x9d95b3dfu),
  vec2<u32>(0x650a7354u, 0x8baf63deu), vec2<u32>(0x766a0abbu, 0x3c77b2a8u),
  vec2<u32>(0x81c2c92eu, 0x47edaee6u), vec2<u32>(0x92722c85u, 0x1482353bu),
  vec2<u32>(0xa2bfe8a1u, 0x4cf10364u), vec2<u32>(0xa81a664bu, 0xbc423001u),
  vec2<u32>(0xc24b8b70u, 0xd0f89791u), vec2<u32>(0xc76c51a3u, 0x0654be30u),
  vec2<u32>(0xd192e819u, 0xd6ef5218u), vec2<u32>(0xd6990624u, 0x5565a910u),
  vec2<u32>(0xf40e3585u, 0x5771202au), vec2<u32>(0x106aa070u, 0x32bbd1b8u),
  vec2<u32>(0x19a4c116u, 0xb8d2d0c8u), vec2<u32>(0x1e376c08u, 0x5141ab53u),
  vec2<u32>(0x2748774cu, 0xdf8eeb99u), vec2<u32>(0x34b0bcb5u, 0xe19b48a8u),
  vec2<u32>(0x391c0cb3u, 0xc5c95a63u), vec2<u32>(0x4ed8aa4au, 0xe3418acbu),
  vec2<u32>(0x5b9cca4fu, 0x7763e373u), vec2<u32>(0x682e6ff3u, 0xd6b2b8a3u),
  vec2<u32>(0x748f82eeu, 0x5defb2fcu), vec2<u32>(0x78a5636fu, 0x43172f60u),
  vec2<u32>(0x84c87814u, 0xa1f0ab72u), vec2<u32>(0x8cc70208u, 0x1a6439ecu),
  vec2<u32>(0x90befffau, 0x23631e28u), vec2<u32>(0xa4506cebu, 0xde82bde9u),
  vec2<u32>(0xbef9a3f7u, 0xb2c67915u), vec2<u32>(0xc67178f2u, 0xe372532bu),
  vec2<u32>(0xca273eceu, 0xea26619cu), vec2<u32>(0xd186b8c7u, 0x21c0c207u),
  vec2<u32>(0xeada7dd6u, 0xcde0eb1eu), vec2<u32>(0xf57d4f7fu, 0xee6ed178u),
  vec2<u32>(0x06f067aau, 0x72176fbau), vec2<u32>(0x0a637dc5u, 0xa2c898a6u),
  vec2<u32>(0x113f9804u, 0xbef90daeu), vec2<u32>(0x1b710b35u, 0x131c471bu),
  vec2<u32>(0x28db77f5u, 0x23047d84u), vec2<u32>(0x32caab7bu, 0x40c72493u),
  vec2<u32>(0x3c9ebe0au, 0x15c9bebcu), vec2<u32>(0x431d67c4u, 0x9c100d4cu),
  vec2<u32>(0x4cc5d4beu, 0xcb3e42b6u), vec2<u32>(0x597f299cu, 0xfc657e2au),
  vec2<u32>(0x5fcb6fabu, 0x3ad6faecu), vec2<u32>(0x6c44198cu, 0x4a475817u),
);

fn add64(a: vec2<u32>, b: vec2<u32>) -> vec2<u32> {
  let low = a.y + b.y;
  let carry = select(0u, 1u, low < a.y);
  return vec2<u32>(a.x + b.x + carry, low);
}

fn add64_4(a: vec2<u32>, b: vec2<u32>, c: vec2<u32>, d: vec2<u32>) -> vec2<u32> {
  return add64(add64(a, b), add64(c, d));
}

fn add64_5(a: vec2<u32>, b: vec2<u32>, c: vec2<u32>, d: vec2<u32>, e: vec2<u32>) -> vec2<u32> {
  return add64(add64_4(a, b, c, d), e);
}

fn xor64(a: vec2<u32>, b: vec2<u32>) -> vec2<u32> {
  return vec2<u32>(a.x ^ b.x, a.y ^ b.y);
}

fn xor64_3(a: vec2<u32>, b: vec2<u32>, c: vec2<u32>) -> vec2<u32> {
  return xor64(xor64(a, b), c);
}

fn rotr64(value: vec2<u32>, amount: u32) -> vec2<u32> {
  if (amount < 32u) {
    return vec2<u32>(
      (value.x >> amount) | (value.y << (32u - amount)),
      (value.y >> amount) | (value.x << (32u - amount)),
    );
  }
  if (amount == 32u) {
    return vec2<u32>(value.y, value.x);
  }
  let shift = amount - 32u;
  return vec2<u32>(
    (value.y >> shift) | (value.x << (32u - shift)),
    (value.x >> shift) | (value.y << (32u - shift)),
  );
}

fn shr64(value: vec2<u32>, amount: u32) -> vec2<u32> {
  if (amount < 32u) {
    return vec2<u32>(value.x >> amount, (value.y >> amount) | (value.x << (32u - amount)));
  }
  if (amount == 32u) {
    return vec2<u32>(0u, value.x);
  }
  return vec2<u32>(0u, value.x >> (amount - 32u));
}

fn choose64(x: vec2<u32>, y: vec2<u32>, z: vec2<u32>) -> vec2<u32> {
  return vec2<u32>((x.x & y.x) ^ ((~x.x) & z.x), (x.y & y.y) ^ ((~x.y) & z.y));
}

fn majority64(x: vec2<u32>, y: vec2<u32>, z: vec2<u32>) -> vec2<u32> {
  return vec2<u32>(
    (x.x & y.x) ^ (x.x & z.x) ^ (y.x & z.x),
    (x.y & y.y) ^ (x.y & z.y) ^ (y.y & z.y),
  );
}

fn big_sigma0(x: vec2<u32>) -> vec2<u32> {
  return xor64_3(rotr64(x, 28u), rotr64(x, 34u), rotr64(x, 39u));
}

fn big_sigma1(x: vec2<u32>) -> vec2<u32> {
  return xor64_3(rotr64(x, 14u), rotr64(x, 18u), rotr64(x, 41u));
}

fn small_sigma0(x: vec2<u32>) -> vec2<u32> {
  return xor64_3(rotr64(x, 1u), rotr64(x, 8u), shr64(x, 7u));
}

fn small_sigma1(x: vec2<u32>) -> vec2<u32> {
  return xor64_3(rotr64(x, 19u), rotr64(x, 61u), shr64(x, 6u));
}

fn sha512_compress(
  state_ptr: ptr<function, array<vec2<u32>, 8>>,
  block_ptr: ptr<function, array<vec2<u32>, 16>>,
) {
  var schedule: array<vec2<u32>, 80>;
  for (var index = 0u; index < 16u; index += 1u) {
    schedule[index] = (*block_ptr)[index];
  }
  for (var index = 16u; index < 80u; index += 1u) {
    schedule[index] = add64_4(
      small_sigma1(schedule[index - 2u]),
      schedule[index - 7u],
      small_sigma0(schedule[index - 15u]),
      schedule[index - 16u],
    );
  }

  var a = (*state_ptr)[0];
  var b = (*state_ptr)[1];
  var c = (*state_ptr)[2];
  var d = (*state_ptr)[3];
  var e = (*state_ptr)[4];
  var f = (*state_ptr)[5];
  var g = (*state_ptr)[6];
  var h = (*state_ptr)[7];

  for (var round = 0u; round < 80u; round += 1u) {
    let t1 = add64_5(h, big_sigma1(e), choose64(e, f, g), SHA512_K[round], schedule[round]);
    let t2 = add64(big_sigma0(a), majority64(a, b, c));
    h = g;
    g = f;
    f = e;
    e = add64(d, t1);
    d = c;
    c = b;
    b = a;
    a = add64(t1, t2);
  }

  (*state_ptr)[0] = add64((*state_ptr)[0], a);
  (*state_ptr)[1] = add64((*state_ptr)[1], b);
  (*state_ptr)[2] = add64((*state_ptr)[2], c);
  (*state_ptr)[3] = add64((*state_ptr)[3], d);
  (*state_ptr)[4] = add64((*state_ptr)[4], e);
  (*state_ptr)[5] = add64((*state_ptr)[5], f);
  (*state_ptr)[6] = add64((*state_ptr)[6], g);
  (*state_ptr)[7] = add64((*state_ptr)[7], h);
}

fn zero_block() -> array<vec2<u32>, 16> {
  return array<vec2<u32>, 16>(
    vec2<u32>(0u), vec2<u32>(0u), vec2<u32>(0u), vec2<u32>(0u),
    vec2<u32>(0u), vec2<u32>(0u), vec2<u32>(0u), vec2<u32>(0u),
    vec2<u32>(0u), vec2<u32>(0u), vec2<u32>(0u), vec2<u32>(0u),
    vec2<u32>(0u), vec2<u32>(0u), vec2<u32>(0u), vec2<u32>(0u),
  );
}

// Finishes SHA-512 after a 128-byte HMAC pad with a 64-byte message.
fn hash_after_pad_64(
  base: array<vec2<u32>, 8>,
  message: array<vec2<u32>, 8>,
) -> array<vec2<u32>, 8> {
  var state = base;
  var message_block = zero_block();
  for (var index = 0u; index < 8u; index += 1u) {
    message_block[index] = message[index];
  }
  message_block[8] = vec2<u32>(0x80000000u, 0u);
  message_block[15] = vec2<u32>(0u, 1536u); // (128 + 64) * 8
  sha512_compress(&state, &message_block);
  return state;
}

fn hmac_64(
  inner_base: array<vec2<u32>, 8>,
  outer_base: array<vec2<u32>, 8>,
  message: array<vec2<u32>, 8>,
) -> array<vec2<u32>, 8> {
  let inner_hash = hash_after_pad_64(inner_base, message);
  return hash_after_pad_64(outer_base, inner_hash);
}

fn input_byte(candidate: u32, byte_index: u32) -> u32 {
  let base_word = candidate * MNEMONIC_STRIDE_WORDS;
  let packed = mnemonic_words[base_word + byte_index / 4u];
  return (packed >> ((byte_index & 3u) * 8u)) & 0xffu;
}

fn load_key_u64(candidate: u32, word_index: u32) -> vec2<u32> {
  let offset = word_index * 8u;
  let high =
    (input_byte(candidate, offset) << 24u) |
    (input_byte(candidate, offset + 1u) << 16u) |
    (input_byte(candidate, offset + 2u) << 8u) |
    input_byte(candidate, offset + 3u);
  let low =
    (input_byte(candidate, offset + 4u) << 24u) |
    (input_byte(candidate, offset + 5u) << 16u) |
    (input_byte(candidate, offset + 6u) << 8u) |
    input_byte(candidate, offset + 7u);
  return vec2<u32>(high, low);
}

fn byte_swap32(value: u32) -> u32 {
  return
    ((value & 0x000000ffu) << 24u) |
    ((value & 0x0000ff00u) << 8u) |
    ((value & 0x00ff0000u) >> 8u) |
    ((value & 0xff000000u) >> 24u);
}

fn derive_from_first_block(
  inner_base: array<vec2<u32>, 8>,
  outer_base: array<vec2<u32>, 8>,
  first_block: array<vec2<u32>, 16>,
  iterations: u32,
) -> array<vec2<u32>, 8> {
  var first_inner = inner_base;
  var mutable_first_block = first_block;
  sha512_compress(&first_inner, &mutable_first_block);
  var current_u = hash_after_pad_64(outer_base, first_inner);
  var derived_key = current_u;

  for (var iteration = 1u; iteration < iterations; iteration += 1u) {
    current_u = hmac_64(inner_base, outer_base, current_u);
    for (var index = 0u; index < 8u; index += 1u) {
      derived_key[index] = xor64(derived_key[index], current_u[index]);
    }
  }
  return derived_key;
}

fn derive_bip39_seed(candidate: u32) -> array<vec2<u32>, 8> {
  var inner_pad = zero_block();
  var outer_pad = zero_block();
  let ipad = vec2<u32>(0x36363636u, 0x36363636u);
  let opad = vec2<u32>(0x5c5c5c5cu, 0x5c5c5c5cu);
  for (var index = 0u; index < 16u; index += 1u) {
    let key_word = load_key_u64(candidate, index);
    inner_pad[index] = xor64(key_word, ipad);
    outer_pad[index] = xor64(key_word, opad);
  }

  var inner_base = SHA512_IV;
  var outer_base = SHA512_IV;
  sha512_compress(&inner_base, &inner_pad);
  sha512_compress(&outer_base, &outer_pad);

  // U1 = HMAC(password, "mnemonic" || INT_32_BE(1)).
  var first_block = zero_block();
  first_block[0] = vec2<u32>(0x6d6e656du, 0x6f6e6963u); // "mnemonic"
  first_block[1] = vec2<u32>(0x00000001u, 0x80000000u);
  first_block[15] = vec2<u32>(0u, 1120u); // (128 + 12) * 8
  return derive_from_first_block(inner_base, outer_base, first_block, PBKDF2_ITERATIONS);
}

// The CPU packs HMAC-SHA512(mnemonic text, empty password) into the input
// block. Validation and default-seed derivation use separate dispatches so the
// expensive 100,000-round pass contains only valid candidates and keeps GPU
// lanes densely occupied.
fn derive_ton24_from_block(
  candidate: u32,
  first_block: array<vec2<u32>, 16>,
  iterations: u32,
) -> array<vec2<u32>, 8> {
  var inner_pad = zero_block();
  var outer_pad = zero_block();
  let ipad = vec2<u32>(0x36363636u, 0x36363636u);
  let opad = vec2<u32>(0x5c5c5c5cu, 0x5c5c5c5cu);
  for (var index = 0u; index < 16u; index += 1u) {
    let key_word = load_key_u64(candidate, index);
    inner_pad[index] = xor64(key_word, ipad);
    outer_pad[index] = xor64(key_word, opad);
  }

  var inner_base = SHA512_IV;
  var outer_base = SHA512_IV;
  sha512_compress(&inner_base, &inner_pad);
  sha512_compress(&outer_base, &outer_pad);

  return derive_from_first_block(
    inner_base,
    outer_base,
    first_block,
    iterations,
  );
}

fn derive_ton24_basic_seed(candidate: u32) -> array<vec2<u32>, 8> {
  var basic_block = zero_block();
  basic_block[0] = vec2<u32>(0x544f4e20u, 0x73656564u); // "TON seed"
  basic_block[1] = vec2<u32>(0x20766572u, 0x73696f6eu); // " version"
  basic_block[2] = vec2<u32>(0x00000001u, 0x80000000u);
  basic_block[15] = vec2<u32>(0u, 1184u); // (128 + 20) * 8
  return derive_ton24_from_block(
    candidate,
    basic_block,
    TON_BASIC_ITERATIONS,
  );
}

fn derive_ton24_default_seed(candidate: u32) -> array<vec2<u32>, 8> {
  var default_block = zero_block();
  default_block[0] = vec2<u32>(0x544f4e20u, 0x64656661u); // "TON defa"
  default_block[1] = vec2<u32>(0x756c7420u, 0x73656564u); // "ult seed"
  default_block[2] = vec2<u32>(0x00000001u, 0x80000000u);
  default_block[15] = vec2<u32>(0u, 1184u); // (128 + 20) * 8
  return derive_ton24_from_block(
    candidate,
    default_block,
    TON_DEFAULT_ITERATIONS,
  );
}

// HMAC-SHA512(key = "ed25519 seed", message = 64-byte BIP39 root seed).
// This is the SLIP-0010 Ed25519 master-key operation.
fn slip10_master(root_seed: array<vec2<u32>, 8>) -> array<vec2<u32>, 8> {
  var inner_pad = zero_block();
  var outer_pad = zero_block();
  let ipad = vec2<u32>(0x36363636u, 0x36363636u);
  let opad = vec2<u32>(0x5c5c5c5cu, 0x5c5c5c5cu);

  // Big-endian ASCII bytes for "ed25519 seed", zero-padded to 128 bytes.
  inner_pad[0] = xor64(vec2<u32>(0x65643235u, 0x35313920u), ipad);
  outer_pad[0] = xor64(vec2<u32>(0x65643235u, 0x35313920u), opad);
  inner_pad[1] = xor64(vec2<u32>(0x73656564u, 0u), ipad);
  outer_pad[1] = xor64(vec2<u32>(0x73656564u, 0u), opad);
  for (var index = 2u; index < 16u; index += 1u) {
    inner_pad[index] = ipad;
    outer_pad[index] = opad;
  }

  var inner_base = SHA512_IV;
  var outer_base = SHA512_IV;
  sha512_compress(&inner_base, &inner_pad);
  sha512_compress(&outer_base, &outer_pad);
  return hmac_64(inner_base, outer_base, root_seed);
}

// HMAC-SHA512 for a 32-byte chain-code key and the 37-byte hardened-child
// payload 0x00 || parent_key || ser32(index). SLIP-0010 Ed25519 supports only
// hardened children, which is exactly what TON's m/44'/607'/0' path uses.
fn slip10_child(
  parent: array<vec2<u32>, 8>,
  child_index: u32,
) -> array<vec2<u32>, 8> {
  var inner_pad = zero_block();
  var outer_pad = zero_block();
  let ipad = vec2<u32>(0x36363636u, 0x36363636u);
  let opad = vec2<u32>(0x5c5c5c5cu, 0x5c5c5c5cu);

  for (var index = 0u; index < 16u; index += 1u) {
    var chain_word = vec2<u32>(0u);
    if (index < 4u) {
      chain_word = parent[index + 4u];
    }
    inner_pad[index] = xor64(chain_word, ipad);
    outer_pad[index] = xor64(chain_word, opad);
  }

  var inner_base = SHA512_IV;
  var outer_base = SHA512_IV;
  sha512_compress(&inner_base, &inner_pad);
  sha512_compress(&outer_base, &outer_pad);

  let k0 = parent[0].x;
  let k1 = parent[0].y;
  let k2 = parent[1].x;
  let k3 = parent[1].y;
  let k4 = parent[2].x;
  let k5 = parent[2].y;
  let k6 = parent[3].x;
  let k7 = parent[3].y;

  var message_block = zero_block();
  message_block[0] = vec2<u32>(
    k0 >> 8u,
    ((k0 & 0xffu) << 24u) | (k1 >> 8u),
  );
  message_block[1] = vec2<u32>(
    ((k1 & 0xffu) << 24u) | (k2 >> 8u),
    ((k2 & 0xffu) << 24u) | (k3 >> 8u),
  );
  message_block[2] = vec2<u32>(
    ((k3 & 0xffu) << 24u) | (k4 >> 8u),
    ((k4 & 0xffu) << 24u) | (k5 >> 8u),
  );
  message_block[3] = vec2<u32>(
    ((k5 & 0xffu) << 24u) | (k6 >> 8u),
    ((k6 & 0xffu) << 24u) | (k7 >> 8u),
  );
  message_block[4] = vec2<u32>(
    ((k7 & 0xffu) << 24u) | (child_index >> 8u),
    ((child_index & 0xffu) << 24u) | 0x00800000u,
  );
  message_block[15] = vec2<u32>(0u, 1320u); // (128 + 37) * 8

  var inner_hash = inner_base;
  sha512_compress(&inner_hash, &message_block);
  return hash_after_pad_64(outer_base, inner_hash);
}

fn derive_ton_path_seed(root_seed: array<vec2<u32>, 8>) -> array<vec2<u32>, 4> {
  var node = slip10_master(root_seed);
  node = slip10_child(node, 0x8000002cu); // 44'
  node = slip10_child(node, 0x8000025fu); // 607'
  node = slip10_child(node, 0x80000000u); // 0'
  return array<vec2<u32>, 4>(node[0], node[1], node[2], node[3]);
}

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let candidate = global_id.x;
  if (candidate >= params.count) {
    return;
  }

  let derived_key = derive_bip39_seed(candidate);

  // Storage u32 values are little-endian. Byte swap each SHA word so a
  // Uint8Array readback is the canonical 64-byte BIP39 seed.
  let output_base = candidate * 16u;
  for (var index = 0u; index < 8u; index += 1u) {
    derived_seeds[output_base + index * 2u] = byte_swap32(derived_key[index].x);
    derived_seeds[output_base + index * 2u + 1u] = byte_swap32(derived_key[index].y);
  }
}

@compute @workgroup_size(64)
fn ton_main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let candidate = global_id.x;
  if (candidate >= params.count) {
    return;
  }

  let ton_seed = derive_ton_path_seed(derive_bip39_seed(candidate));
  let output_base = candidate * 8u;
  for (var index = 0u; index < 4u; index += 1u) {
    derived_seeds[output_base + index * 2u] = byte_swap32(ton_seed[index].x);
    derived_seeds[output_base + index * 2u + 1u] = byte_swap32(ton_seed[index].y);
  }
}

@compute @workgroup_size(64)
fn ton24_validate_main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let candidate = global_id.x;
  if (candidate >= params.count) {
    return;
  }

  let basic_seed = derive_ton24_basic_seed(candidate);
  derived_seeds[candidate] = select(0u, 1u, (basic_seed[0].x >> 24u) == 0u);
}

@compute @workgroup_size(64)
fn ton24_derive_main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let candidate = global_id.x;
  if (candidate >= params.count) {
    return;
  }

  let seed = derive_ton24_default_seed(candidate);
  let output_base = candidate * 8u;
  for (var index = 0u; index < 4u; index += 1u) {
    derived_seeds[output_base + index * 2u] = byte_swap32(seed[index].x);
    derived_seeds[output_base + index * 2u + 1u] = byte_swap32(seed[index].y);
  }
}
`;
const n = 2048, r = 64, i = 12, a = 32, o = 4, s = `abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about`, c = { MAP_READ: 1, COPY_SRC: 4, COPY_DST: 8, UNIFORM: 64, STORAGE: 128 };
var l = class extends Error {
  code;
  constructor(e3, t2) {
    super(e3), this.code = t2, this.name = `WebGpuPbkdf2Error`;
  }
};
const u = new TextEncoder();
function d(e3) {
  return e3.normalize(`NFKD`).trim().split(/\s+/u).join(` `);
}
function f(e3) {
  let t2 = d(e3);
  if ((t2.length === 0 ? [] : t2.split(` `)).length !== 12) throw new l(`Expected exactly 12 BIP39 words.`, `invalid-input`);
  let n2 = u.encode(t2);
  if (n2.byteLength > 128) throw n2.fill(0), new l(`The normalized mnemonic exceeds 128 UTF-8 bytes.`, `invalid-input`);
  return n2;
}
function p(e3) {
  if (e3.length === 0) return { words: new Uint32Array(), count: 0, strideBytes: 128 };
  let t2 = new Uint32Array(e3.length * 128 / Uint32Array.BYTES_PER_ELEMENT), n2 = new Uint8Array(t2.buffer);
  try {
    e3.forEach((e4, t3) => {
      let r2 = f(e4);
      n2.set(r2, t3 * 128), r2.fill(0);
    });
  } catch (e4) {
    throw t2.fill(0), e4;
  }
  return { words: t2, count: e3.length, strideBytes: 128 };
}
function m(t2) {
  if (t2.length === 0) return { words: new Uint32Array(), count: 0, strideBytes: 128 };
  let n2 = new Uint32Array(t2.length * 128 / Uint32Array.BYTES_PER_ELEMENT), r2 = new Uint8Array(n2.buffer);
  try {
    return t2.forEach((t3, n3) => {
      let i2 = e(t3);
      try {
        r2.set(i2, n3 * 128);
      } finally {
        i2.fill(0);
      }
    }), { words: n2, count: t2.length, strideBytes: 128 };
  } catch (e3) {
    throw n2.fill(0), e3;
  }
}
function h(e3) {
  if (!/^(?:[0-9a-fA-F]{2})+$/.test(e3)) throw Error(`Expected an even-length hexadecimal string.`);
  let t2 = new Uint8Array(e3.length / 2);
  for (let n2 = 0; n2 < t2.length; n2 += 1) t2[n2] = Number.parseInt(e3.slice(n2 * 2, n2 * 2 + 2), 16);
  return t2;
}
function g(e3, t2) {
  let n2 = e3.length ^ t2.length, r2 = Math.max(e3.length, t2.length);
  for (let i2 = 0; i2 < r2; i2 += 1) n2 |= (e3[i2] ?? 0) ^ (t2[i2] ?? 0);
  return n2 === 0;
}
async function _(e3) {
  let t2 = globalThis.crypto?.subtle;
  if (!t2) throw new l(`Web Crypto is unavailable.`, `unsupported`);
  let r2 = f(e3), i2 = u.encode(`mnemonic`);
  try {
    let e4 = await t2.importKey(`raw`, r2.buffer, `PBKDF2`, false, [`deriveBits`]), a2 = await t2.deriveBits({ name: `PBKDF2`, hash: `SHA-512`, salt: i2, iterations: n }, e4, 512);
    return new Uint8Array(a2);
  } finally {
    r2.fill(0), i2.fill(0);
  }
}
function v() {
  return typeof navigator > `u` ? null : navigator;
}
function y(e3) {
  let t2 = e3?.info;
  if (t2) return { vendor: t2.vendor || void 0, architecture: t2.architecture || void 0, device: t2.device || void 0, description: t2.description || void 0 };
}
async function b(e3) {
  let n2 = e3.createShaderModule({ label: `TON Suite BIP39 PBKDF2-HMAC-SHA512`, code: t });
  if (typeof n2.getCompilationInfo == `function`) {
    let e4 = (await n2.getCompilationInfo()).messages.filter((e5) => e5.type === `error`);
    if (e4.length > 0) throw new l(`WebGPU shader compilation failed: ${e4.map((e5) => e5.message).join(`; `)}`, `shader-compilation`);
  }
  let r2 = (t2, r3) => {
    let i3 = { label: r3, layout: `auto`, compute: { module: n2, entryPoint: t2 } };
    return typeof e3.createComputePipelineAsync == `function` ? e3.createComputePipelineAsync(i3) : e3.createComputePipeline(i3);
  }, [i2, a2, o2, s2] = await Promise.all([r2(`main`, `BIP39 PBKDF2-HMAC-SHA512 pipeline`), r2(`ton_main`, `BIP39 + TON SLIP-0010 pipeline`), r2(`ton24_validate_main`, `TON 24-word mnemonic validation pipeline`), r2(`ton24_derive_main`, `TON 24-word mnemonic seed pipeline`)]);
  return { rootSeed: i2, tonPathSeed: a2, tonMnemonicValidation: o2, tonMnemonicSeed: s2 };
}
async function x(e3, t2) {
  try {
    for (let { buffer: n2, size: r2 } of t2) if (!(!n2 || r2 <= 0)) try {
      e3.queue.writeBuffer(n2, 0, new Uint8Array(r2));
    } catch {
    }
    typeof e3.queue.onSubmittedWorkDone == `function` && await e3.queue.onSubmittedWorkDone();
  } catch {
  } finally {
    for (let { buffer: e4 } of t2) try {
      e4?.destroy();
    } catch {
    }
  }
}
var S = class e2 {
  adapter;
  device;
  rootSeedPipeline;
  tonPathSeedPipeline;
  tonMnemonicValidationPipeline;
  tonMnemonicSeedPipeline;
  supportInfo;
  destroyed = false;
  deviceLost = false;
  constructor(e3, t2, r2, i2, a2, o2, s2, c2) {
    this.adapter = e3, this.device = t2, this.rootSeedPipeline = r2, this.tonPathSeedPipeline = i2, this.tonMnemonicValidationPipeline = a2, this.tonMnemonicSeedPipeline = o2, this.supportInfo = { supported: true, adapter: y(e3), backend: `webgpu-pbkdf2-hmac-sha512`, iterations: n, workgroupSize: 64, maxBatchSize: s2, selfTestPassed: c2 }, t2.lost?.then(() => {
      this.deviceLost = true;
    });
  }
  static async create(t2 = {}) {
    let n2 = v();
    if (!n2?.gpu) throw new l(`WebGPU is unavailable in this browser or context.`, `unsupported`);
    let r2 = await n2.gpu.requestAdapter({ powerPreference: t2.powerPreference ?? `high-performance` });
    if (!r2) throw new l(`No compatible WebGPU adapter was returned.`, `adapter-unavailable`);
    let i2 = await r2.requestDevice(), a2;
    try {
      let n3 = await b(i2), o2 = Number(i2.limits?.maxStorageBufferBindingSize ?? 2 ** 53 - 1), s2 = Math.max(1, Math.floor(t2.maxBatchSize ?? 256)), c2 = Math.max(1, Math.min(s2, Math.floor(o2 / 128), Math.floor(o2 / 64)));
      return a2 = new e2(r2, i2, n3.rootSeed, n3.tonPathSeed, n3.tonMnemonicValidation, n3.tonMnemonicSeed, c2, false), t2.selfTest !== false && (await a2.runSelfTest(), a2.supportInfo.selfTestPassed = true), a2;
    } catch (e3) {
      if (a2?.destroy(), !a2) try {
        i2.destroy?.();
      } catch {
      }
      throw e3;
    }
  }
  async deriveSeeds(e3) {
    return this.deriveInChunks(e3, `root`);
  }
  async deriveTonSeeds(e3) {
    return this.deriveInChunks(e3, `ton`);
  }
  async deriveTonMnemonicSeeds(e3) {
    if (this.assertUsable(), e3.length === 0) return [];
    let t2 = [];
    try {
      for (let n2 = 0; n2 < e3.length; n2 += this.supportInfo.maxBatchSize) {
        let r2 = e3.slice(n2, n2 + this.supportInfo.maxBatchSize);
        t2.push(...await this.deriveTonMnemonicChunk(r2));
      }
      return t2;
    } catch (e4) {
      for (let e5 of t2) e5?.fill(0);
      throw e4;
    }
  }
  async deriveInChunks(e3, t2) {
    if (this.assertUsable(), e3.length === 0) return [];
    let n2 = [], r2 = this.supportInfo.maxBatchSize;
    try {
      for (let i2 = 0; i2 < e3.length; i2 += r2) {
        let a2 = e3.slice(i2, i2 + r2);
        n2.push(...await this.deriveChunk(a2, t2));
      }
      return n2;
    } catch (e4) {
      for (let e5 of n2) e5.fill(0);
      throw e4;
    }
  }
  async benchmark(e3 = {}) {
    this.assertUsable();
    let t2 = Math.max(1, Math.min(Math.floor(e3.batchSize ?? 64), this.supportInfo.maxBatchSize)), n2 = Math.max(1, Math.floor(e3.rounds ?? 3)), r2 = Array.from({ length: t2 }, () => s), i2 = await this.deriveSeeds(r2.slice(0, Math.min(4, t2)));
    for (let e4 of i2) e4.fill(0);
    let a2 = performance.now();
    for (let e4 = 0; e4 < n2; e4 += 1) {
      let e5 = await this.deriveSeeds(r2);
      for (let t3 of e5) t3.fill(0);
    }
    let o2 = performance.now() - a2;
    return { batchSize: t2, rounds: n2, elapsedMs: o2, seedsPerSecond: o2 > 0 ? t2 * n2 * 1e3 / o2 : 0, adapter: this.supportInfo.adapter };
  }
  async runSelfTest() {
    this.assertUsable();
    let e3 = h(`5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4`), t2 = h(`b477ef5ed17fb8a2b8faddd7a9835a227243a82c70b190c7af4896155aa7df9f`), n2, r2;
    try {
      if ([n2] = await this.deriveSeeds([s]), !n2 || !g(n2, e3)) throw new l(`WebGPU PBKDF2 failed the standard BIP39 known-answer test.`, `self-test`);
      if ([r2] = await this.deriveTonSeeds([s]), !r2 || !g(r2, t2)) throw new l(`WebGPU TON SLIP-0010 failed its known-answer test.`, `self-test`);
    } finally {
      n2?.fill(0), r2?.fill(0), e3.fill(0), t2.fill(0);
    }
  }
  async runTonMnemonicSelfTest() {
    this.assertUsable();
    let e3 = h(`e9c96cef04c0826acbedd3f885d48ffb682d955dec654240f2593ef1c410499b`), t2;
    try {
      if ([t2] = await this.deriveTonMnemonicSeeds([`panic job where tourist large stand genius lunch normal enough helmet honey torch fragile flock symbol slender bicycle off park way phrase axis paddle`]), !t2 || !g(t2, e3)) throw new l(`WebGPU TON 24-word mnemonic failed its known-answer test.`, `self-test`);
    } finally {
      t2?.fill(0), e3.fill(0);
    }
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      try {
        this.device.destroy?.();
      } catch {
      }
    }
  }
  assertUsable() {
    if (this.destroyed) throw new l(`The WebGPU PBKDF2 accelerator has been destroyed.`, `device-lost`);
    if (this.deviceLost) throw new l(`The WebGPU device was lost.`, `device-lost`);
  }
  async deriveTonMnemonicChunk(e3) {
    let t2, n2;
    try {
      t2 = await this.dispatchTonMnemonicPacked(m(e3), this.tonMnemonicValidationPipeline, 4, `TON mnemonic validation`);
      let r2 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength), i2 = [];
      for (let t3 = 0; t3 < e3.length; t3 += 1) r2.getUint32(t3 * 4, true) === 1 && i2.push(t3);
      if (i2.length === 0) return Array.from({ length: e3.length }, () => null);
      let a2 = i2.map((t3) => e3[t3]);
      n2 = await this.dispatchTonMnemonicPacked(m(a2), this.tonMnemonicSeedPipeline, 32, `TON mnemonic default-seed derivation`);
      let o2 = Array(e3.length).fill(null);
      return i2.forEach((e4, t3) => {
        o2[e4] = n2.slice(t3 * 32, (t3 + 1) * 32);
      }), o2;
    } finally {
      t2?.fill(0), n2?.fill(0);
    }
  }
  async dispatchTonMnemonicPacked(e3, t2, n2, r2) {
    let i2 = e3.words.byteLength, a2 = e3.count * n2, o2 = new Uint32Array([e3.count, 0, 0, 0]), s2, l2, u2, d2, f2 = false, p2, m2 = false;
    try {
      s2 = this.device.createBuffer({ label: `${r2} HMAC key blocks`, size: i2, usage: c.STORAGE | c.COPY_DST }), l2 = this.device.createBuffer({ label: `${r2} output`, size: a2, usage: c.STORAGE | c.COPY_SRC | c.COPY_DST }), u2 = this.device.createBuffer({ label: `${r2} batch parameters`, size: o2.byteLength, usage: c.UNIFORM | c.COPY_DST }), d2 = this.device.createBuffer({ label: `${r2} readback`, size: a2, usage: c.MAP_READ | c.COPY_DST }), this.device.queue.writeBuffer(s2, 0, e3.words), this.device.queue.writeBuffer(u2, 0, o2);
      let n3 = this.device.createBindGroup({ layout: t2.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: s2 } }, { binding: 1, resource: { buffer: l2 } }, { binding: 2, resource: { buffer: u2 } }] }), h2 = this.device.createCommandEncoder({ label: `${r2} command encoder` }), g2 = h2.beginComputePass({ label: r2 });
      return g2.setPipeline(t2), g2.setBindGroup(0, n3), g2.dispatchWorkgroups(Math.ceil(e3.count / 64)), g2.end(), h2.copyBufferToBuffer(l2, 0, d2, 0, a2), this.device.queue.submit([h2.finish()]), await d2.mapAsync(1, 0, a2), f2 = true, p2 = new Uint8Array(d2.getMappedRange(0, a2)).slice(), d2.unmap(), f2 = false, m2 = true, p2;
    } finally {
      if (f2) try {
        d2?.unmap();
      } catch {
      }
      e3.words.fill(0), o2.fill(0), m2 || p2?.fill(0), await x(this.device, [{ buffer: s2, size: i2 }, { buffer: l2, size: a2 }, { buffer: u2, size: o2.byteLength }, { buffer: d2, size: a2 }]);
    }
  }
  async deriveChunk(e3, t2) {
    let n2 = p(e3), r2 = n2.words.byteLength, i2 = t2 === `ton` ? 32 : 64, a2 = n2.count * i2, o2 = new Uint32Array([n2.count, 0, 0, 0]), s2, l2, u2, d2, f2 = false, m2;
    try {
      s2 = this.device.createBuffer({ label: `BIP39 mnemonic HMAC key blocks`, size: r2, usage: c.STORAGE | c.COPY_DST }), l2 = this.device.createBuffer({ label: `BIP39 derived seeds`, size: a2, usage: c.STORAGE | c.COPY_SRC | c.COPY_DST }), u2 = this.device.createBuffer({ label: `BIP39 PBKDF2 batch parameters`, size: o2.byteLength, usage: c.UNIFORM | c.COPY_DST }), d2 = this.device.createBuffer({ label: `BIP39 seed readback`, size: a2, usage: c.MAP_READ | c.COPY_DST }), this.device.queue.writeBuffer(s2, 0, n2.words), this.device.queue.writeBuffer(u2, 0, o2);
      let e4 = this.device.createBindGroup({ layout: (t2 === `ton` ? this.tonPathSeedPipeline : this.rootSeedPipeline).getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: s2 } }, { binding: 1, resource: { buffer: l2 } }, { binding: 2, resource: { buffer: u2 } }] }), p2 = this.device.createCommandEncoder({ label: `BIP39 PBKDF2 command encoder` }), h2 = p2.beginComputePass({ label: `BIP39 PBKDF2-HMAC-SHA512` });
      return h2.setPipeline(t2 === `ton` ? this.tonPathSeedPipeline : this.rootSeedPipeline), h2.setBindGroup(0, e4), h2.dispatchWorkgroups(Math.ceil(n2.count / 64)), h2.end(), p2.copyBufferToBuffer(l2, 0, d2, 0, a2), this.device.queue.submit([p2.finish()]), await d2.mapAsync(1, 0, a2), f2 = true, m2 = new Uint8Array(d2.getMappedRange(0, a2)).slice(), d2.unmap(), f2 = false, Array.from({ length: n2.count }, (e5, t3) => m2.slice(t3 * i2, (t3 + 1) * i2));
    } finally {
      if (f2) try {
        d2?.unmap();
      } catch {
      }
      n2.words.fill(0), o2.fill(0), m2?.fill(0), await x(this.device, [{ buffer: s2, size: r2 }, { buffer: l2, size: a2 }, { buffer: u2, size: o2.byteLength }, { buffer: d2, size: a2 }]);
    }
  }
};
async function C(e3 = {}) {
  let t2;
  try {
    return t2 = await S.create(e3), { ...t2.supportInfo };
  } catch (e4) {
    return { supported: false, reason: e4 instanceof Error ? e4.message : `Unknown WebGPU error.`, backend: `webgpu-pbkdf2-hmac-sha512`, iterations: n, workgroupSize: 64, maxBatchSize: 0, selfTestPassed: false };
  } finally {
    t2?.destroy();
  }
}
async function w() {
  let e3 = await S.create();
  try {
    return { support: { ...e3.supportInfo }, benchmark: await e3.benchmark({ batchSize: 16, rounds: 1 }) };
  } finally {
    e3.destroy();
  }
}
export { i as BIP39_MNEMONIC_WORDS, n as BIP39_PBKDF2_ITERATIONS, r as BIP39_SEED_BYTES, o as TON_MNEMONIC_VALIDATION_BYTES, a as TON_PATH_SEED_BYTES, S as WebGpuPbkdf2Accelerator, l as WebGpuPbkdf2Error, g as bytesEqual, d as canonicalizeBip39Mnemonic, _ as deriveBip39SeedCpuReference, f as encodeBip39Mnemonic, C as getWebGpuPbkdf2SupportInfo, h as hexToBytes, p as packMnemonicBatch, m as packTonMnemonicEntropyBatch, w as runWebGpuPbkdf2BrowserSelfTest };
