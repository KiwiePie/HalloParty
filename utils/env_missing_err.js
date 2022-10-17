export default function(env) {
  console.error(`${env} is missing in environment`);
  process.exit(1);
}
