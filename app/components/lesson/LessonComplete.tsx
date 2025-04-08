const updateProgress = async (lessonId: string, score: number) => {
  try {
    const response = await fetch('/api/user/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lessonId,
        completed: true,
        score,
      }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error);
    }

    // Show success message or redirect
    showToast.success('Progress saved!');
  } catch (error) {
    console.error('Failed to update progress:', error);
    showToast.error('Failed to save progress');
  }
}; 