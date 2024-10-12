import { GhostIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux";
const NotFound = () => {
    const mode = useSelector(state => state.movies.mode)
  return (
    <div className={mode ? " " : "dark"}>
    
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <GhostIcon className="w-24 h-24 text-foreground mb-8" />
        <h1 className="text-4xl font-bold mb-4 text-foreground">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="max-w-md mb-8">
          <p className="text-muted-foreground">
            It seems you've ventured into uncharted territory. Don't worry, even
            the best explorers get lost sometimes!
          </p>
        </div>
        <Link to="/">
          <Button size="lg" className="font-semibold">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
