<?php
	// if $_POST["line"] is not set, calc and display the number of lines in the file
	if(!isset($_POST["line"])){
		/* open the file in read only mode */
		$file = fopen("list.csv", "r");
		$lines = 0;
		while(!feof($file)){
			$line = fgets($file);
			$lines++;
		}
		echo $lines - 2;
		/* close the file */
		fclose($file);
	// else, if $_POST["line"] is provided, seek and display that specific line
	}else{
		/* open the file in read only mode */
		$spl = new SplFileObject("list.csv", "r");
		/* seek and display line */
		$spl->seek($_POST["line"]);
		echo ($spl->valid()) ? $spl->current() : "eof";
		/* close the file */
		$spl = null;
	}
?>