'use client';

import {useState, useRef, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Info} from 'lucide-react';
import {useToast} from "@/hooks/use-toast";

const CameraPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const { toast } = useToast()

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setImage(dataUrl);
    }
  };

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
          toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use this app.',
          });
      }
    };

    getCameraPermission();
  }, [toast]);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-secondary">
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-md">
        <CardHeader>
          <CardTitle>Capture Ingredients Image</CardTitle>
          <CardDescription>Capture an image of your ingredients to get started.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted />

          {!(hasCameraPermission) && (
              <Alert variant="destructive">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                      Please allow camera access to use this feature.
                  </AlertDescription>
              </Alert>
          )
          }

          <Button onClick={captureImage} disabled={!hasCameraPermission} className="mt-2 bg-accent text-primary-foreground hover:bg-accent-foreground">
            Capture Image
          </Button>

          {image && (
            <img src={image} alt="Captured ingredients" className="max-w-full h-auto rounded-md mt-4" />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CameraPage;
