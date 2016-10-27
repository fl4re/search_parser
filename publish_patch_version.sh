# setlocal EnableDelayedExpansion
set -e
if [ ! -v FL4RE_PUBLISH_BRANCH ]; then
  echo "FL4RE_PUBLISH_BRANCH must be set, exiting."
  exit 1
fi
echo "This is to be only called from Jenkins to publish npm module"
git rev-parse --is-inside-work-tree

tagged_version=`npm --no-git-tag-version version patch`
echo $tagged_version
npm publish

git add package.json npm-shrinkwrap.json
git commit -m "$tagged_version"
git tag -a $tagged_version -m "$tagged_version"
git push origin HEAD:$FL4RE_PUBLISH_BRANCH
git push origin tag $tagged_version
