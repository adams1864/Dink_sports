# Cloudinary Setup Instructions

To enable image uploads for products, you need to configure Cloudinary. You can use the free tier which is sufficient for this project.

## Step 1: Create a Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account.
2. Once logged in, go to your **Dashboard**.

## Step 2: Get Cloud Name
1. In the Dashboard, look for **"Cloud Name"**.
2. Copy this value.

## Step 3: Create an Upload Preset
1. Go to **Settings** (gear icon) > **Upload**.
2. Scroll down to **"Upload presets"**.
3. Click **"Add upload preset"**.
4. **Name**: Give it a name (e.g., `dink_sports_preset`).
5. **Signing Mode**: Select **"Unsigned"** (This is crucial for direct browser uploads).
6. Click **"Save"**.
7. Copy the **"Name"** of the preset you just created.

## Step 4: Configure Environment Variables
1. Open the `.env.local` file in your `Dink_sports` frontend folder.
2. Add the following lines, replacing the values with yours:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name_here
```

## Step 5: Restart Frontend
1. Stop the frontend server (Ctrl+C).
2. Run `npm run dev` again to load the new environment variables.

## Testing
1. Go to `/manage/product/new`.
2. Fill in the product details.
3. Upload an image.
4. Click "Create Product".
5. If successful, the product will be created with the image URL from Cloudinary.
