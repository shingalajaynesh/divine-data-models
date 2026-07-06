import crypto from "crypto";
const SIZE_OF_UINT32_IN_BYTES = 4;
const config = {
  hashBytes: 32, // Number of bytes for the hash
  saltBytes: 16, // Number of bytes for the salt
  iterations: 10000,
  digest: "sha512",
};

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.saltBytes, (err, salt) => {
      if (err) {
        return reject(err);
      }

      crypto.pbkdf2(
        password,
        salt,
        config.iterations,
        config.hashBytes,
        config.digest,
        (err, hash) => {
          if (err) {
            return reject(err);
          }

          const saltLengthPosition = 0;
          const iterationsPosition =
            saltLengthPosition + SIZE_OF_UINT32_IN_BYTES;
          const saltPosition = iterationsPosition + SIZE_OF_UINT32_IN_BYTES;
          const hashPosition = saltPosition + salt.length;
          const totalLength = hashPosition + hash.length;

          let combined = Buffer.alloc(totalLength);
          combined.writeUInt32BE(salt.length, saltLengthPosition, true);
          combined.writeUInt32BE(config.iterations, iterationsPosition, true);

          salt.copy(combined, saltPosition);
          hash.copy(combined, hashPosition);
          return resolve(combined);
        }
      );
    });
  });
};

export const verifyPassword = (password, combined) => {
  const saltLengthPosition = 0;
  const iterationsPosition = saltLengthPosition + SIZE_OF_UINT32_IN_BYTES;

  const saltLength = combined.readUInt32BE(saltLengthPosition);
  const iterations = combined.readUInt32BE(iterationsPosition);

  const saltPosition = iterationsPosition + SIZE_OF_UINT32_IN_BYTES;
  const hashPosition = saltPosition + saltLength;
  const hashLength = config.hashBytes; // Use the configured hash length

  // Validate lengths
  if (
    saltLength <= 0 ||
    hashLength <= 0 ||
    hashPosition + hashLength > combined.length
  ) {
    return Promise.reject(new Error("Invalid salt or hash length."));
  }

  const salt = combined.slice(saltPosition, saltPosition + saltLength);
  const hash = combined.toString(
    "binary",
    hashPosition,
    hashPosition + hashLength
  ); // Specify the length

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      hashLength,
      config.digest,
      (err, verify) => {
        if (err) {
          return reject(err);
        }

        resolve(verify.toString("binary") === hash);
      }
    );
  });
};

export const createRandomHex = (bytes) => {
  if (typeof bytes !== "number") {
    bytes = 20;
  }

  return new Promise((resolve, reject) => {
    crypto.randomBytes(bytes, (err, code) => {
      if (err) {
        return reject(err);
      }

      resolve(code.toString("hex"));
    });
  });
};
