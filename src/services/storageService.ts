import {firebaseStorage, firebaseAuth} from './firebase';

// Upload avatar image to Firebase Storage
export const uploadAvatar = async (localUri: string): Promise<string> => {
  const user = firebaseAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // Create a reference to the avatar file
  const avatarRef = firebaseStorage.ref(`avatars/${user.uid}`);

  // Upload the file
  await avatarRef.putFile(localUri);

  // Get the download URL
  const downloadUrl = await avatarRef.getDownloadURL();

  return downloadUrl;
};

// Delete avatar from Firebase Storage
export const deleteAvatar = async (): Promise<void> => {
  const user = firebaseAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const avatarRef = firebaseStorage.ref(`avatars/${user.uid}`);

  try {
    await avatarRef.delete();
  } catch (error: any) {
    // Ignore error if file doesn't exist
    if (error.code !== 'storage/object-not-found') {
      throw error;
    }
  }
};

// Get avatar URL
export const getAvatarUrl = async (userId: string): Promise<string | null> => {
  const avatarRef = firebaseStorage.ref(`avatars/${userId}`);

  try {
    const url = await avatarRef.getDownloadURL();
    return url;
  } catch (error: any) {
    // Return null if file doesn't exist
    if (error.code === 'storage/object-not-found') {
      return null;
    }
    throw error;
  }
};
