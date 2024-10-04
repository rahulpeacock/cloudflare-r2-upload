const uploadRes = await fetch(res.signedUrl, {
  method: 'PUT',
  body: file,
});

if (!uploadRes.ok) {
  toast.error('Failed to Upload media!');
  setLoading(false);
  return;
}