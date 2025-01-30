/* eslint-disable func-style */
export async function fetchSoftwareSkills() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/software-skill`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error('Fetch error details:', errorDetails);
      console.error('Response status:', res.status);
      throw new Error(`Failed to fetch skills: ${errorDetails}`);
    }

    return res.json();
  } catch (error) {
    console.error('Fetch skill error:', error);
    throw error;
  }
}
