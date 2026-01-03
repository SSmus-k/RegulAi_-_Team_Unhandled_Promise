from rest_framework import serializers


class LegalReferenceSerializer(serializers.Serializer):
    act = serializers.CharField()
    year = serializers.CharField()
    section = serializers.CharField(allow_blank=True, required=False)
    source_type = serializers.ChoiceField(choices=["Act", "Constitution", "Regulation"], default="Act")


class FinalAssessmentSerializer(serializers.Serializer):
    confidence_score = serializers.FloatField(min_value=0.0, max_value=1.0)
    risk_level = serializers.ChoiceField(choices=["Low", "Medium", "High"], default="Low")


class MetadataSerializer(serializers.Serializer):
    semantic_reuse = serializers.BooleanField(default=False)
    spam_score = serializers.FloatField(min_value=0.0, max_value=1.0, default=0.0)
    model_used = serializers.ChoiceField(choices=["database", "gemini"], default="database")


class AIResponseSerializer(serializers.Serializer):
    schema_version = serializers.CharField(default="1.0")
    canonical_question = serializers.CharField()
    summary = serializers.CharField()
    key_points = serializers.ListField(child=serializers.CharField(), required=False)
    step_by_step = serializers.ListField(child=serializers.CharField(), required=False)
    legal_references = LegalReferenceSerializer(many=True, required=False)
    final_assessment = FinalAssessmentSerializer()
    metadata = MetadataSerializer()

    def validate(self, data):
        # Optionally enforce required fields or custom logic
        return data
