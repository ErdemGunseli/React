// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// The API directory is used for setting up routes that are server-side only.

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
