
[CmdletBinding()]
param (
    [ValidateScript( { test-path $_ })]
    [Parameter(Mandatory = $true)]
    $Path,
    [ValidateScript( {
            if (-not (test-path $_)) {
                try {
                    new-item -path $_ -itemtype directory -force
                }
                catch {
                    return $false
                }
            }
            return $true
        })]
    [Parameter(Mandatory = $true)]
    $Output,
    [switch]
    $RunAfterExport = $false
)
    
begin {
    $Output = Get-Item $Output

    if (-not (Get-Command pandoc)) {
        [System.IO.FileNotFoundException]::new("Pandoc is not installed.")
    }
    $Files = new-object System.Collections.ArrayList
    if ([System.IO.File]::Exists($Path)) {
        $Files += Get-Item $Path
    }
    if ([System.IO.Directory]::Exists($Path)) {
        $markdownSearchPath = [System.IO.Path]::combine($Path, "*.md") 
        $Files += Get-ChildItem $markdownSearchPath
    }
    if ($Files.Count -eq 0) {
        [System.IO.FileNotFoundException]::new("Input folder does not contain markdown files.")
    }
    foreach ($file in $Files) {
        Write-Host Files to be converted: $file
    }
}
    
process {
    $startPath = (Get-Location).Path
    foreach ($file in $Files) {
        # Better pandoc compatibility in case it references files that are only found relative to the markdown
        $parent = [System.IO.Directory]::GetParent($file)
        Set-Location $parent

        $outputPath = [System.IO.Path]::Combine($Output, "$($file.BaseName).pptx")
        $templatePath = [System.IO.Path]::Combine($startPath, "designs\template.pptx");
        pandoc $file -o $outputPath --slide-level 2 --toc --toc-depth=2 --reference-doc=$templatePath
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host File has been written: $outputPath
            if ($RunAfterExport) {
                Start-Process $outputPath
            }
        }
    }
}
    
end {
    # not sure if this will matter, but let's set the env path back to where we began
    Set-Location $startPath
}