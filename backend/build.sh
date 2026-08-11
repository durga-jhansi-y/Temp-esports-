#!/usr/bin/env bash
# =============================================================================
# build.sh – Bootstrap Maven and build the Esports Auth backend
# Epic 4 – Keepa Maharjan
#
# Usage (from the backend/ directory):
#   chmod +x build.sh && ./build.sh
#
# This script:
#   1. Sets JAVA_HOME to Temurin 25 if present
#   2. Downloads the Maven wrapper jar if missing
#   3. Runs: mvnw clean package (skip tests initially)
#   4. Runs: mvnw test
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ── 1. Set JAVA_HOME ─────────────────────────────────────────────────────────
TEMURIN_25="/Library/Java/JavaVirtualMachines/temurin-25.jdk/Contents/Home"
if [ -d "$TEMURIN_25" ]; then
  export JAVA_HOME="$TEMURIN_25"
  echo "✓ Using Java: $JAVA_HOME"
else
  if [ -z "$JAVA_HOME" ]; then
    echo "ERROR: JAVA_HOME is not set and Temurin 25 not found at $TEMURIN_25"
    exit 1
  fi
  echo "✓ Using JAVA_HOME: $JAVA_HOME"
fi

export PATH="$JAVA_HOME/bin:$PATH"
java -version

# ── 2. Download Maven wrapper jar if missing ──────────────────────────────────
WRAPPER_JAR=".mvn/wrapper/maven-wrapper.jar"
WRAPPER_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar"

if [ ! -f "$WRAPPER_JAR" ]; then
  echo "⬇  Downloading Maven wrapper jar..."
  mkdir -p .mvn/wrapper
  if command -v curl >/dev/null 2>&1; then
    /usr/bin/curl -fsSL "$WRAPPER_URL" -o "$WRAPPER_JAR"
  elif command -v wget >/dev/null 2>&1; then
    wget -q -O "$WRAPPER_JAR" "$WRAPPER_URL"
  else
    echo "ERROR: Neither curl nor wget found. Cannot download Maven wrapper."
    exit 1
  fi
  echo "✓ Maven wrapper jar downloaded."
fi

chmod +x mvnw

# ── 3. Build ──────────────────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════"
echo "  Building: esports-auth"
echo "═══════════════════════════════════════════════════"
./mvnw clean package -DskipTests

echo ""
echo "═══════════════════════════════════════════════════"
echo "  Running Tests"
echo "═══════════════════════════════════════════════════"
./mvnw test

echo ""
echo "✅ Build and tests completed successfully!"
echo ""
echo "To start the server:"
echo "  export JWT_SECRET=<your-strong-secret>"
echo "  ./mvnw spring-boot:run"
